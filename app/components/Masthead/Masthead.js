import styles from "./Masthead.module.css";

const Masthead = () => {
  return (
    <header className={styles.masthead}>
      <div className={styles.container}>
        <h1 className={styles.heading}>CrapR</h1>
        <h2 className={styles.subheading}>Getting rid of a bunch of crap</h2>
      </div>
    </header>
  );
};

export default Masthead;
