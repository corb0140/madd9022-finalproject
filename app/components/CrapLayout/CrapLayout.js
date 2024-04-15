"use client";

import styles from "./CrapLayout.module.css";
import { useRouter } from "next/navigation";

const CrapLayout = ({ data }) => {
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
            console.log(crap);
            return (
              <div
                className={styles.card}
                key={crap._id}
                onClick={() => navigate(crap._id)}
              >
                <div className={styles.cardTitle}>{crap.title}</div>
                <div className={styles.cardDescription}>{crap.description}</div>
              </div>
            );
          })}
      </ul>
    </div>
  );
};

export default CrapLayout;
