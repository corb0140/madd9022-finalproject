"use client";

import styles from "./CrapIdLayout.module.css";
import Image from "next/image";
import { getSessions } from "@/app/actions";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const CrapIdLayout = ({ data }) => {
  const router = useRouter();
  const crap = data.data;
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (crap.status === "AVAILABLE") {
      return;
    } else if (crap.status === "INTERESTED") {
      setShowForm(true);
    }
  }, [crap.status]);

  const deleteCrap = async () => {
    const base =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/"
        : "https://madd9022-finalproject.vercel.app/";

    const token = await getSessions();

    await fetch(`${base}api/crapId?token=${token?.value}&id=${crap._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    });

    return router.push("/mine");
  };

  return (
    <div>
      <div className={styles.container}>
        {showForm && (
          <form className={styles.form}>
            <div className={styles.formBox}>
              <label className={styles.label} htmlFor="address">
                Pickup Address:
              </label>
              <input
                className={styles.inputField}
                type="text"
                placeholder="Address"
                name="address"
              />
            </div>
            <div className={styles.formBox}>
              <label className={styles.label} htmlFor="title">
                Pickup Date:
              </label>
              <input className={styles.inputField} type="date" name="date" />
            </div>
            <div className={styles.formBox}>
              <label className={styles.label} htmlFor="title">
                Pickup Time:
              </label>
              <input className={styles.inputField} type="time" name="time" />
            </div>

            <div className={styles.formBox}>
              <button className={styles.submit} type="submit">
                Suggest pickup time and location
              </button>
            </div>
          </form>
        )}

        {!showForm && (
          <div>
            <p>No one has shown interest in this crap</p>
          </div>
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

          <div>
            <button className={styles.delete} onClick={deleteCrap}>
              Delete this crap
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrapIdLayout;
