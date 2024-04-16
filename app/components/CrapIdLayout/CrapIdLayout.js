"use client";

import styles from "./CrapIdLayout.module.css";
import Image from "next/image";
import { getSessions, makeSuggestion } from "@/app/actions";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const CrapIdLayout = ({ data, id }) => {
  const router = useRouter();
  const crap = data.data;
  const [notOwner, setNotOwner] = useState(true);

  console.log(crap);
  useEffect(() => {
    if (crap.owner._id !== id) {
      return;
    } else {
      setNotOwner(false);
    }
  }, [id, crap.owner._id]);

  // DELETE FUNCTION
  const deleteCrap = async () => {
    const base =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/"
        : "https://madd9022-finalproject.vercel.app/";

    const token = await getSessions();

    await fetch(`${base}api/crapId?token=${token?.value}&id=${crap._id}`, {
      method: "DELETE",
    });

    return router.push("/mine");
  };

  // INTERESTED FUNCTION
  const interested = async () => {
    const base =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/"
        : "https://madd9022-finalproject.vercel.app/";

    const token = await getSessions();

    await fetch(`${base}api/crapId?token=${token?.value}&id=${crap._id}`, {
      method: "POST",
    });

    router.refresh();
  };

  return (
    <div>
      {/* DISPLAY FORM OR INTEREST BUTTON BASED ON BUYER OR SELLER */}
      <div className={styles.container}>
        {notOwner ? (
          <>
            {/* IF AVAILABLE SHOW INTERESTED BUTTON. IF NOT, SHOW WAITING MESSAGE */}
            {crap.status === "AVAILABLE" ? (
              <div>
                <p className={styles.interestText}>
                  Are you interested in this crap? Click the button below
                </p>
                <button className={styles.interestBtn} onClick={interested}>
                  INTERESTED
                </button>
              </div>
            ) : (
              <div>
                <p className={styles.interestText}>
                  Waiting for seller to respond
                </p>
              </div>
            )}
          </>
        ) : (
          <>
            {/* IF STATUS INTERESTED, DISPLAY FORM.*/}
            {crap.status === "INTERESTED" && (
              <form className={styles.form} action={makeSuggestion}>
                <input type="hidden" name="id" value={crap._id} />
                <div className={styles.formBox}>
                  <label className={styles.label} htmlFor="address">
                    Pickup Address:
                  </label>
                  <input
                    className={styles.inputField}
                    type="text"
                    placeholder="address"
                    name="address"
                  />
                </div>
                <div className={styles.formBox}>
                  <label className={styles.label} htmlFor="date">
                    Pickup Date:
                  </label>
                  <input
                    className={styles.inputField}
                    type="date"
                    name="date"
                  />
                </div>
                <div className={styles.formBox}>
                  <label className={styles.label} htmlFor="time">
                    Pickup Time:
                  </label>
                  <input
                    className={styles.inputField}
                    type="time"
                    name="time"
                    placeholder="00:00 AM/PM"
                  />
                </div>

                <div className={styles.formBox}>
                  <button className={styles.submit} type="submit">
                    Suggest pickup time and location
                  </button>
                </div>
              </form>
            )}

            {/* IF STATUS IS SCHEDULED, DISPLAY SUGGESTION DATA */}
            {crap.status === "SCHEDULED" && (
              <div>
                <p>Address: {crap.suggestion.address}</p>
                <p>Date: {crap.suggestion.date}</p>
                <p>Time: {crap.suggestion.time}</p>
              </div>
            )}
          </>
        )}

        {/* MESSAGE WHEN PRODUCT IS AVAILABLE */}
        {!notOwner ? (
          <>
            {crap.status === "AVAILABLE" ? (
              <div>
                <p>No one has shown interested in this crap</p>
              </div>
            ) : (
              ""
            )}
          </>
        ) : (
          ""
        )}

        {/* CRAP CARD */}
        <div className={styles.card}>
          <div className={styles.cardTitle}>
            {crap.title} - [{crap.status}]
          </div>

          <div className={styles.cardContent}>{crap.description}</div>

          <div className={styles.imageBox}>
            <Image
              className={styles.image}
              src={crap.images[0]}
              alt={crap.title}
              width={500}
              height={500}
              style={{ objectFit: "cover" }}
            />
          </div>

          {notOwner ? (
            "Only the owner can delete this crap."
          ) : (
            <div>
              <button className={styles.delete} onClick={deleteCrap}>
                Delete this crap
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CrapIdLayout;
