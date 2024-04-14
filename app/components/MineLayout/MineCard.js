import styles from "./MineCard.module.css";
import Image from "next/image";

const MineCard = ({ data }) => {
  //   console.log(data);
  console.log(data.images[0]);
  return (
    <li className={styles.card}>
      <div className={styles.content}>
        <h2 className={styles.title}>{data.title}</h2>
        <p className={styles.description}>{data.description}</p>
      </div>
      <div className={styles.imageBox}>
        <Image
          className={styles.image}
          src={data.images[0]}
          alt={data.title}
          width={200}
          height={200}
        />
      </div>
    </li>
  );
};

export default MineCard;
