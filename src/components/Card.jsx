import styles from "../css/card.module.css";

export default function Card() {
  return (
    <>
      <div className={styles.card}>
        <ul className={styles.items_photo}>
          <li className={styles.item_photo}>
            <img src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGNpdHl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=6" alt="photo" />
          </li>
          <li className={styles.item_photo}>
            <img src="https://images.unsplash.com/photo-1560840067-ddcaeb7831d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDB8fGNpdHl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" alt="photo" />
          </li>
          <li className={styles.item_photo}>
            <img src="https://images.unsplash.com/photo-1531219572328-a0171b4448a3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzl8fGNpdHl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" alt="photo" />
          </li>
          <li className={styles.item_photo}>
            <img src="https://images.unsplash.com/photo-1573108724029-4c46571d6490?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGNpdHl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" alt="photo" />
          </li>
        </ul>
        
        <div className={styles.title}>
            <p>Путешествие в Европу</p>
        </div>
      </div>
    </>
  );
}
