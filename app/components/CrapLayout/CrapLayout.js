"use client";

import styles from "./CrapLayout.module.css";
import { useRouter } from "next/navigation";

const CrapLayout = ({ data, token }) => {
  const router = useRouter();

  const navigate = (id) => {
    router.push(`/crap/${id}`);
  };

  const craps = data.data;

  return (
    <div className={styles.container}>
      <ul className={styles.cardList}>
        {craps.length > 0 &&
          craps.map((crap) => {
            return (
              <div
                className={styles.card}
                key={crap._id}
                onClick={() => navigate(crap._id)}
              >
                <div className={styles.cardTitle}>{crap.title}</div>
                <div className={styles.cardDescription}>{crap.description}</div>
                {token === crap.owner._id && "This is your crap"}
              </div>
            );
          })}
      </ul>
    </div>
  );
};

export default CrapLayout;
