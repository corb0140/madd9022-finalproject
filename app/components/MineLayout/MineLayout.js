"use client";

import Image from "next/image";
import styles from "./MineLayout.module.css";
import { useRouter } from "next/navigation";

const MineLayout = ({ craps, owner }) => {
  const router = useRouter();

  const navigate = (id) => {
    router.push(`/crap/${id}`);
  };

  const crapsData = craps.data;
  return (
    <div>
      {/* CRAP I WANT TO GET RID OFF*/}
      <div className={styles.container}>
        <h2 className={styles.subheading}>Crap I want to get rid of</h2>

        <ul className={styles.cardList}>
          {crapsData.length > 0 &&
            crapsData.map((crap) => {
              return (
                <>
                  {crap.owner._id === owner && crap.status !== "FLUSHED" && (
                    <div key={crap._id}>
                      <li
                        className={styles.card}
                        onClick={() => navigate(crap._id)}
                      >
                        <div className={styles.content}>
                          <div>
                            <h2 className={styles.title}>{crap.title}</h2>
                          </div>

                          <div>
                            <p className={styles.status}>{crap.status}</p>
                            <p className={styles.description}>
                              {crap.description}
                            </p>
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
                    </div>
                  )}
                </>
              );
            })}
        </ul>
      </div>
      {/* CRAP I AM INTERESTED IN */}
      <div className={styles.container}>
        <h2 className={styles.subheading}>Crap I am interested in</h2>
        <ul className={styles.cardList}>
          {crapsData.length > 0 &&
            crapsData.map((crap) => {
              return (
                <>
                  {crap.owner._id !== owner &&
                    crap.status !== "AVAILABLE" &&
                    crap.status !== "FLUSHED" && (
                      <div key={crap._id}>
                        <li
                          className={styles.card}
                          onClick={() => navigate(crap._id)}
                        >
                          <div className={styles.content}>
                            <div>
                              <h2 className={styles.title}>{crap.title}</h2>
                            </div>

                            <div>
                              <p className={styles.status}>{crap.status}</p>
                              <p className={styles.description}>
                                {crap.description}
                              </p>
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
                      </div>
                    )}
                </>
              );
            })}
        </ul>
      </div>
      ;
    </div>
  );
};

export default MineLayout;
