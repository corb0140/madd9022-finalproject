import styles from "./CrapLayout.module.css";

const CrapLayout = ({ data }) => {
  const craps = data.data;
  return (
    <div className={styles.container}>
      <ul className={styles.cardList}>
        {craps.length > 0 &&
          craps.map((crap) => {
            console.log(crap);
            return (
              <div className={styles.card} key={crap._id}>
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
