import styles from "./page.module.css";
import { redirect } from "next/navigation";
import { getSessions } from "@/app/actions";
import { getCrap } from "@/app/actions";

export default async function Home() {
  const node_env =
    process.env.NODE_ENV === "development"
      ? "http://localhost:4000"
      : "https://madd9124-finalproject.onrender.com";

  const base_url = process.env.BASE_URL;

  const redirectUrl = `${base_url}login`;
  const url = `${node_env}/auth/google?redirect_url=${redirectUrl}`;

  let token = await getSessions();

  return (
    <div>
      {!token?.value && (
        <div className={styles.container}>
          <form
            action={async () => {
              "use server";
              redirect(url);
            }}
          >
            <button className={styles.login}>Login</button>
          </form>
        </div>
      )}

      {token?.value && (
        <div className={styles.container}>
          <form className={styles.form} action={getCrap}>
            <div className={styles.formBox}>
              <label className={styles.label} htmlFor="">
                Search for Crap
              </label>
              <input
                className={styles.searchField}
                type="text"
                placeholder="keyword"
                name="keyword"
                checked
              />
            </div>

            <div className={styles.formBox}>
              <p className={styles.radioHeading}>Please enter a range with: </p>

              <div className={styles.radio}>
                <div>
                  <input
                    type="radio"
                    id="10000meters"
                    value="10000"
                    name="distance"
                    required
                  />
                  <label className={styles.label} htmlFor="1000meters">
                    10000 Meters
                  </label>
                </div>

                <div>
                  <input
                    type="radio"
                    id="30000meters"
                    value="30000"
                    name="distance"
                    required
                  />
                  <label className={styles.label} htmlFor="3000meters">
                    30000 Meters
                  </label>
                </div>

                <div>
                  <input
                    type="radio"
                    id="50000meters"
                    value="500000000000"
                    name="distance"
                    required
                  />
                  <label className={styles.label} htmlFor="5000meters">
                    50000 Meters
                  </label>
                </div>
              </div>
            </div>

            <div className={styles.formBox}>
              <input className={styles.submit} type="submit" />
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
