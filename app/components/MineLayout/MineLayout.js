"use client";

import Image from "next/image";
import styles from "./MineLayout.module.css";
import { useRouter } from "next/navigation";

const MineLayout = ({ craps }) => {
  const router = useRouter();

  const navigate = (id) => {
    router.push(`/crap/${id}`);
  };

  const crapsData = craps.data;
  return (
    <div className={styles.container}>
      <div className={styles.cardList}>
        {crapsData.length > 0 &&
          crapsData.map((crap) => {
            return (
              <>
                <li className={styles.card} onClick={() => navigate(crap._id)}>
                  <div className={styles.content}>
                    <div>
                      <h2 className={styles.title}>{crap.title}</h2>
                    </div>

                    <div>
                      <p className={styles.status}>{crap.status}</p>
                      <p className={styles.description}>{crap.description}</p>
                    </div>
                  </div>

                  <div className={styles.imageBox}>
                    <Image
                      className={styles.image}
                      src={crap.images[0]}
                      alt={crap.title}
                      width={200}
                      height={200}
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </li>
              </>
            );
          })}
      </div>
    </div>
  );
};

export default MineLayout;
