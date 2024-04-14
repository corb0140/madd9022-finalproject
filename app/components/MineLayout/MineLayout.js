import MineCard from "./MineCard";
import styles from "./MineLayout.module.css";

const MineLayout = ({ craps }) => {
  const crapsData = craps.data;
  return (
    <div className={styles.container}>
      <div className={styles.cardList}>
        {crapsData.length > 0 &&
          crapsData.map((crap) => {
            return <MineCard data={crap} key={crap._id} />;
          })}
      </div>
    </div>
  );
};

export default MineLayout;
