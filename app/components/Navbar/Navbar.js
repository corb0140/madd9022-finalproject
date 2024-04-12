import styles from "./Navbar.module.css";

import Link from "next/link";

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
        <Link className={styles.link} href="">
          Logout
        </Link>
      </navbar>
    </div>
  );
};

export default Navbar;
