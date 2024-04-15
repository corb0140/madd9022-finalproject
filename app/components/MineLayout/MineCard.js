import styles from "./MineCard.module.css";
import Image from "next/image";

const MineCard = ({ data, navigate }) => {
  return (
    <li className={styles.card} onClick={navigate}>
      <div className={styles.content}>
        <div>
          <h2 className={styles.title}>{data.title}</h2>
        </div>

        <div>
          <p className={styles.status}>{data.status}</p>
          <p className={styles.description}>{data.description}</p>
        </div>
      </div>

      <div className={styles.imageBox}>
        <Image
          className={styles.image}
          src={data.images[0]}
          alt={data.title}
          width={200}
          height={200}
          style={{ objectFit: "cover" }}
        />
      </div>
    </li>
  );
};

export default MineCard;
