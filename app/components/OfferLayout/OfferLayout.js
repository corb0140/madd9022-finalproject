import styles from "./OfferLayout.module.css";
import { postCrap } from "@/app/actions";

const OfferLayout = ({ geo }) => {
  return (
    <div>
      <div>{geo.lat}</div>
      <div>{geo.long}</div>
      <div className={styles.container}>
        <form className={styles.form} action={postCrap}>
          <input type="hidden" name="lat" value={geo.lat} />
          <input type="hidden" name="long" value={geo.long} />
          <div className={styles.formBox}>
            <label className={styles.label} htmlFor="title">
              Title:
            </label>
            <input
              className={styles.searchField}
              type="text"
              placeholder="title"
              name="title"
            />
          </div>

          <div className={styles.formBox}>
            <label className={styles.label} htmlFor="description">
              Description:
            </label>
            <textarea
              className={styles.textarea}
              name="description"
              rows="4"
              cols="50"
              placeholder="description"
            />
          </div>

          <div className={styles.formBox}>
            <label className={styles.label} htmlFor="image">
              Image:
            </label>
            <input
              className={styles.image}
              type="file"
              name="image"
              accept="image/*"
            />
          </div>

          <div className={styles.formBox}>
            <button className={styles.submit} type="submit">
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OfferLayout;
