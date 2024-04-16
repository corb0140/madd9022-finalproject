import styles from "./WipedLayout.module.css";
import Image from "next/image";

const WipedLayout = ({ data }) => {
  const wipedData = data.data;

  console.log(wipedData);

  return (
    <div>
      <ul className={styles.cardList}>
        {wipedData.length > 0 &&
          wipedData.map((crap, index) => (
            <>
              {crap.status === "FLUSHED" && (
                <li key={index} className={styles.card}>
                  <h1>{crap.title}</h1>
                  <p>{crap.status}</p>
                  <p>{crap.description}</p>

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
