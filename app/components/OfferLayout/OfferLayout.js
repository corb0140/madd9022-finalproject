import styles from "./OfferLayout.module.css";
import { postCrap } from "@/app/actions";

const OfferLayout = ({ geo }) => {
  return (
    <div>
      <div className={styles.container}>
        <form className={styles.form} action={postCrap}>
          <input type="hidden" name="long" value={geo.long} />
          <input type="hidden" name="lat" value={geo.lat} />
          <div className={styles.formBox}>
            <label className={styles.label} htmlFor="title">
              Title:
            </label>
            <input
              className={styles.searchField}
              type="text"
              placeholder="title"
              name="title"
              required
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
              required
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
              required
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
