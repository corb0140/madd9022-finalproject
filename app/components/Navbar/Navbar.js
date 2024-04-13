import styles from "./Navbar.module.css";

import Link from "next/link";
import { logout } from "@/app/actions";
import { redirect } from "next/navigation";

const Navbar = () => {
  return (
    <div className={styles.container}>
      <navbar className={styles.navbar}>
        <Link className={styles.link} href="/crap">
          Search 4 Crap
        </Link>
        <Link className={styles.link} href="/offer">
          Offer crap
        </Link>
        <Link className={styles.link} href="/mine">
          My crap
        </Link>
        <Link className={styles.link} href="/wiped">
          Wiped
        </Link>

        <form
          action={async () => {
            "use server";

            await logout();
            redirect("/");
          }}
        >
          <button className={styles.logout}>Log out</button>
        </form>
      </navbar>
    </div>
  );
};

export default Navbar;
