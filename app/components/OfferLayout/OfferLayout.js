'use client';

import styles from "./OfferLayout.module.css";

import { handleOfferForm } from "@/app/actions";


const OfferLayout = () => {
  return (
    <div className={styles.container}>

      <form className={styles.form} action={handleOfferForm}>
        <div className={styles.formBox}>
          <label className={styles.label} htmlFor="offerTitle">Title of Crap</label>
          <input className={styles.searchField} type="text" id="offerTitle" name="offerTitle" placeholder="Title" />
          {/* <input type="text" id="offerTitle" name="offerTitle" placeholder="Title" required /> */}
        </div>
        <div className={styles.formBox}>
          <label className={styles.label} htmlFor="offerDescription">Description of Crap</label>
          <input className={styles.searchField} type="text" id="offerDescription" name="offerDescription" placeholder="Description" />
          {/* <input type="text" id="offerDescription" name="offerDescription" placeholder="Description" required /> */}
        </div>
        <div className={styles.formBox}>
          <label className={styles.label} htmlFor="offerImage">Crap</label>
          <input className={styles.searchField} type="file" id="offerImage" name="offerImage" accept="image/*" />
          {/* <input type="file" id="offerImage" name="offerImage" accept="image/*" required /> */}
        </div>
        <p>
          <button className={styles.upload} >Upload</button>
        </p>
      </form>

    </div>
  );
};



export default OfferLayout;
