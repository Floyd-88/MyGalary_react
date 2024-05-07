import styles from "../css/tegs.module.css";

export default function Tegs() {
  return (
    <>
      <ul className={styles.block_tegs}>
        <li className={styles.tegs}>Все</li>
        <li className={styles.tegs}>Горы</li>
        <li className={styles.tegs}>Море</li>
        <li className={styles.tegs}>Архитектура</li>
        <li className={styles.tegs}>Города</li>
      </ul>
    </>
  );
}
