import styles from "../css/search.module.css";

export default function Search() {

  return (
    <>
      <input className={styles.searchCards} type="text"  placeholder="Поиск по названию"/>
    </>
  );
}
