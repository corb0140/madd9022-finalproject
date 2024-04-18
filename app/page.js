import styles from "./page.module.css";
import { redirect } from "next/navigation";
import { getSessions } from "@/app/actions";
import { getCrap } from "@/app/actions";

export default async function Home() {
  const base =
    process.env.NODE_ENV === "development"
      ? "http://localhost:4000"
      : "https://madd9124-finalproject.onrender.com";

  const base_url = process.env.BASE_URL;

  const redirectUrl = `${base_url}login`;
  const url = `${base}/auth/google?redirect_url=${redirectUrl}`;

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
              />
            </div>

            <div className={styles.formBox}>
              <p className={styles.radioHeading}>Please enter a range with: </p>

              <div className={styles.radio}>
                <div>
                  <input
                    type="radio"
                    id="10000"
                    value="10000"
                    name="distance"
                    required
                  />
                  <label className={styles.label} htmlFor="10000">
                    10 km
                  </label>
                </div>

                <div>
                  <input
                    type="radio"
                    id="30000"
                    value="30000"
                    name="distance"
                    required
                  />
                  <label className={styles.label} htmlFor="30000">
                    30 km
                  </label>
                </div>

                <div>
                  <input
                    type="radio"
                    id="50000"
                    value="50000"
                    name="distance"
                    required
                  />
                  <label className={styles.label} htmlFor="50000">
                    50 km
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
