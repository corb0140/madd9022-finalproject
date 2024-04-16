"use client";

import styles from "./CrapIdLayout.module.css";
import Image from "next/image";
import { getSessions, makeSuggestion } from "@/app/actions";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const CrapIdLayout = ({ data, id }) => {
  const router = useRouter();
  const crap = data.data;
  const [isOwner, setIsOwner] = useState(true);

  useEffect(() => {
    if (crap.owner._id !== id) {
      return;
    } else {
      setIsOwner(false);
    }
  }, [id, crap.owner._id]);

  const deleteCrap = async () => {
    const base =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/"
        : "https://madd9022-finalproject.vercel.app/";

    const token = await getSessions();

    if (crap.owner._id !== id) {
      return;
    }

    await fetch(`${base}api/crapId?token=${token?.value}&id=${crap._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    });

    if (crap.owner._id !== id) {
      return;
    }
    return router.push("/mine");
  };

  const interested = async () => {
    const base =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/"
        : "https://madd9022-finalproject.vercel.app/";

    const token = await getSessions();

    const resp = await fetch(
      `${base}api/crapId?token=${token?.value}&id=${crap._id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      }
    );

    const data = await resp.json();

    router.refresh();
  };

  return (
    <div>
      <div className={styles.container}>
        {isOwner ? (
          <>
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
          <form className={styles.form} action={makeSuggestion}>
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
              <input className={styles.inputField} type="date" name="date" />
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

        {!isOwner ? (
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

          {isOwner ? (
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
