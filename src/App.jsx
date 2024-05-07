import Cards from "./components/Cards";
import Pagination from "./components/Pagination";
import Search from "./components/Search";
import Tegs from "./components/Tegs";
import styles from "./css/app.module.css";

export default function App() {
  return (
    <>
      <h1 className={styles.title}>Моя колекция фотографий</h1>
      <div className={styles.block_header}>
        <Tegs />
        <Search />
      </div>

      <Cards />

      <Pagination />
    </>
  );
}
