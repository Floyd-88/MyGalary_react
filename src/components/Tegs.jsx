import styles from "../css/tegs.module.css";

export default function Tegs({ categorys, activeCategorys, setActiveCategorys, setPageCount }) {
  return (
    <>
      <ul className={styles.block_tegs}>
        {categorys.map((cat, index) => (
          <li onClick={() => {
            setActiveCategorys(Number(cat.category))
            setPageCount(1)
            }} key={index} className={`${styles.tegs} ${cat.category == activeCategorys ? styles.active : ''}`}>
            {cat.name}
          </li>
        ))}
      </ul>
    </>
  );
}
