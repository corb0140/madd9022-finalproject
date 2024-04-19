"use client";

import styles from "./WipedLayout.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

const WipedLayout = ({ data }) => {
  const wipedData = data.data;
  const router = useRouter();

  if (!wipedData || wipedData.length === 0) {
    return (
      <div className={styles.container}>
        <p>There is no flushed crap</p>
      </div>
    );
  }

  const base =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/"
      : "https://madd9022-finalproject.vercel.app/";

  const navigateToCrap = (id) => {
    router.push(`${base}crap/${id}`);
  };

  return (
    <div className={styles.container}>
      <ul className={styles.cardList}>
        {wipedData.length > 0 &&
          wipedData.map((crap, index) => (
            <>
              {crap.status === "FLUSHED" && (
                <li
                  key={index}
                  className={styles.card}
                  onClick={() => navigateToCrap(crap._id)}
                >
                  <h1 className={styles.title}>{crap.title}</h1>
                  <p className={styles.status}>{crap.status}</p>
                  <p className={styles.description}>{crap.description}</p>

                  <Image
                    className={styles.image}
                    src={crap.images[0]}
                    alt={crap.title}
                    width={250}
                    height={250}
                    style={{ objectFit: "cover" }}
                  />
                </li>
              )}
            </>
          ))}
      </ul>
    </div>
  );
};

export default WipedLayout;
