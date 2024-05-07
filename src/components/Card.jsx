import styles from "../css/card.module.css";

export default function Card({ collection }) {
  return (
    <>
      <div className={styles.card}>
        <ul className={styles.items_photo}>
          {collection.photos.map((photo, index) => (
            <li key={index} className={styles.item_photo}>
              <img src={photo} alt="photo" />
            </li>
          ))}
        </ul>

        <div className={styles.title}>{collection.name}</div>
      </div>
    </>
  );
}
