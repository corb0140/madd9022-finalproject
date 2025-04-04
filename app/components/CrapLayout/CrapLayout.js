"use client";

import styles from "./CrapLayout.module.css";
import { useRouter } from "next/navigation";

const CrapLayout = ({ data, owner }) => {
  const router = useRouter();

  const navigate = (id) => {
    router.push(`/crap/${id}`);
  };

  const craps = data.data;

  if (!craps || craps.length === 0) {
    return (
      <div className={styles.container}>
        <p>No crap to show</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <ul className={styles.cardList}>
        {craps.length > 0 &&
          craps.map((crap, index) => {
            return (
              <li
                className={styles.card}
                key={index}
                onClick={() => navigate(crap._id)}
              >
                <div className={styles.cardTitle}>{crap.title}</div>
                <div className={styles.cardDescription}>{crap.description}</div>
                {owner === crap.owner._id ? (
                  <p className={styles.cardOwnerCrap}>This is your crap</p>
                ) : (
                  <p className={styles.cardOwnerCrap}>
                    This is {crap.owner.name + "'s"} crap
                  </p>
                )}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default CrapLayout;
