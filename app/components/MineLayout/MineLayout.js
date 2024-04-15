"use client";

import MineCard from "./MineCard";
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
              <MineCard
                data={crap}
                key={crap._id}
                navigate={() => navigate(crap._id)}
              />
            );
          })}
      </div>
    </div>
  );
};

export default MineLayout;
