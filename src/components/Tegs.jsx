import styles from "../css/tegs.module.css";

export default function Tegs({
  categorys,
  activeCategorys,
  setActiveCategorys,
  setPageCount,
}) {
  return (
    <>
      <select
        className={styles.block_tegs}
        onChange={(e) => {
          setActiveCategorys(Number(e.target.selectedIndex));
          setPageCount(1);
        }}
      >
        {categorys.map((cat, index) => (
          <option
            key={index}
            className={`${styles.tegs} ${
              cat.category == activeCategorys ? styles.active : ""
            }`}
          >
            {cat.name}
          </option>
        ))}
      </select>
    </>
  );
}
