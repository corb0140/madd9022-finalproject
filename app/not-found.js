"use client";

import styles from "./not-found.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

  const backToHome = () => {
    router.push("/");
  };
  return (
    <div className={styles.container}>
      <Image src="/404.jpg" alt="404" width={300} height={300} />
      <button className={styles.backBtn} onClick={backToHome}>
        Go back to home
      </button>
    </div>
  );
};

export default NotFound;
