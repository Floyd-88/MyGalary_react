import styles from "../css/tegs.module.css";

export default function Tegs({ categorys, activeCategorys, setActiveCategorys }) {
  return (
    <>
      <ul className={styles.block_tegs}>
        {categorys.map((cat, index) => (
          <li onClick={() => setActiveCategorys(cat.category)} key={index} className={`${styles.tegs} ${cat.category == activeCategorys ? styles.active : ''}`}>
            {cat.name}
          </li>
        ))}
      </ul>
    </>
  );
}
