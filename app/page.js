import Navbar from "./components/Navbar/Navbar";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div>
      <nav className={styles.nav}>
        <Navbar />
      </nav>

      <div className={styles.container}>
        <form className={styles.form} action="">
          <div className={styles.formBox}>
            <label className={styles.label} htmlFor="">
              Search for Crap
            </label>
            <input
              className={styles.searchField}
              type="text"
              placeholder="keyword"
            />
          </div>

          <div className={styles.formBox}>
            <p className={styles.radioHeading}>Please enter a range with: </p>

            <div className={styles.radio}>
              <div>
                <input type="radio" id="1000meters" value="1000" />
                <label className={styles.label} htmlFor="1000meters">
                  1000 Meters
                </label>
              </div>

              <div>
                <input type="radio" id="1000meters" value="3000" />
                <label className={styles.label} htmlFor="3000meters">
                  3000 Meters
                </label>
              </div>

              <div>
                <input type="radio" id="1000meters" value="5000" />
                <label className={styles.label} htmlFor="5000meters">
                  5000 Meters
                </label>
              </div>
            </div>
          </div>

          <div className={styles.formBox}>
            <input className={styles.submit} type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}
