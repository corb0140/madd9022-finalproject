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

  useEffect(() => {
    if (crap.owner._id !== id) {
      return;
    } else {
      setNotOwner(false);
    }
  }, [id, crap.owner._id]);

  const base =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/"
      : "https://madd9022-finalproject.vercel.app/";

  // DELETE FUNCTION
  const deleteCrap = async () => {
    const token = await getSessions();

    await fetch(`${base}api/crapId?token=${token?.value}&id=${crap._id}`, {
      method: "DELETE",
    });

    return router.push("/mine");
  };

  // INTERESTED FUNCTION
  const interested = async () => {
    const token = await getSessions();

    await fetch(`${base}api/crapId?token=${token?.value}&id=${crap._id}`, {
      method: "POST",
    });

    router.refresh();
  };

  //AGREED FUNCTION
  const agree = async () => {
    const token = await getSessions();

    await fetch(`${base}api/agree?token=${token?.value}&id=${crap._id}`, {
      method: "POST",
    });

    router.refresh();
  };

  //DISAGREED FUNCTION
  const disagree = async () => {
    const token = await getSessions();

    await fetch(`${base}api/disagree?token=${token?.value}&id=${crap._id}`, {
      method: "POST",
    });

    router.refresh();
  };

  //FLUSHED FUNCTION
  const flushed = async () => {
    const token = await getSessions();

    await fetch(`${base}api/flush?token=${token?.value}&id=${crap._id}`, {
      method: "POST",
    });

    router.push("/wiped");
  };

  return (
    <div>
      {/* DISPLAY FORM OR INTEREST BUTTON BASED ON BUYER OR SELLER */}
      <div className={styles.container}>
        {notOwner ? (
          <>
            {/* IF AVAILABLE, SHOW INTERESTED BUTTON */}
            {crap.status === "AVAILABLE" && (
              <div>
                <p className={styles.suggestionText}>
                  Are you interested in this crap? Click the button below
                </p>
                <button className={styles.interestBtn} onClick={interested}>
                  INTERESTED
                </button>
              </div>
            )}

            {/* SHOW AGREE & DISAGREE BUTTONS IF CRAP IS SCHEDULED */}
            <div>
              {crap.status === "SCHEDULED" && (
                <div className={styles.scheduledContainer}>
                  <p className={styles.suggestionText}>
                    Address: {crap.suggestion.address}
                  </p>
                  <p className={styles.suggestionText}>
                    Date: {crap.suggestion.date.split("T")[0]}
                  </p>
                  <p className={styles.suggestionText}>
                    Time: {crap.suggestion.time}
                  </p>

                  <div className={styles.btnContainer}>
                    <button className={styles.agreeBtn} onClick={agree}>
                      Agree
                    </button>
                    <button className={styles.disagreeBtn} onClick={disagree}>
                      Disagree
                    </button>
                  </div>
                </div>
              )}

              {/* CHANGE MESSAGE BASED ON AGREE OR DISAGREE */}
              {crap.status === "AGREED" && (
                <div>
                  <p className={styles.suggestionText}>
                    Address: {crap.suggestion.address}
                  </p>
                  <p className={styles.suggestionText}>
                    Date: {crap.suggestion.date.split("T")[0]}
                  </p>
                  <p className={styles.suggestionText}>
                    Time: {crap.suggestion.time}
                  </p>
                </div>
              )}

              {/* WAIT MESSAGE IF INTERESTED */}
              {crap.status === "INTERESTED" && (
                <p className={styles.suggestionText}>
                  Waiting for seller to respond
                </p>
              )}
            </div>
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
                <p className={styles.suggestionText}>
                  Address: {crap.suggestion.address}
                </p>
                <p className={styles.suggestionText}>
                  Date: {crap.suggestion.date.split("T")[0]}
                </p>
                <p className={styles.suggestionText}>
                  Time: {crap.suggestion.time}
                </p>
              </div>
            )}

            {/* IF STATUS IS AGREED, DISPLAY AGREED BUTTON */}
            {crap.status === "AGREED" && (
              <div>
                <button className={styles.flushBtn} onClick={flushed}>
                  Flush this crap
                </button>
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
