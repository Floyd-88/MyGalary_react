import styles from "../css/pagination.module.css";

export default function Pagination() {

  return (
    <>
      <ul className={styles.block_pagination}>
        <li className={styles.pagination}>1</li>
        <li className={styles.pagination}>2</li>
        <li className={styles.pagination}>3</li>
        <li className={styles.pagination}>4</li>
        <li className={styles.pagination}>5</li>
      </ul>
    </>
  );
}
