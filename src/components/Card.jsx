import styles from "../css/card.module.css";

export default function Card() {
  return (
    <>
      <div className={styles.card}>
        <ul className={styles.items_photo}>
          <li className={styles.item_photo}>
            <img src="" alt="photo" />
          </li>
          <li className={styles.item_photo}>
            <img src="" alt="photo" />
          </li>
          <li className={styles.item_photo}>
            <img src="" alt="photo" />
          </li>
          <li className={styles.item_photo}>
            <img src="" alt="photo" />
          </li>
        </ul>
        <div className={styles.title}>
            <p></p>
        </div>
      </div>
    </>
  );
}
