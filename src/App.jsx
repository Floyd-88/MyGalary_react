import { useEffect } from "react";
import Cards from "./components/Cards";
import Pagination from "./components/Pagination";
import Search from "./components/Search";
import Tegs from "./components/Tegs";
import styles from "./css/app.module.css";
import { useState } from "react";

export default function App() {
  const [collections, setCollections] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const [activeCategorys, setActiveCategorys] = useState(0);
  const [searchCollections, setSearchCollections] = useState("");
  const [page, setPage] = useState({})
  const [pageCount, setPageCount] = useState(1)

  useEffect(() => {
    fetch(
      `https://afbf733ef0b7e113.mokky.dev/photos_collections?page=${pageCount}&limit=4`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.items.length > 0) {
          const collections = data.items.filter(
            (collection) =>
              Number(collection.category) === activeCategorys ||
              activeCategorys === 0
          );
          setCollections(collections);
          setPage(data.meta)
        }
      })
      .catch((err) => console.log(err));
  }, [activeCategorys, pageCount]);

  useEffect(() => {
    fetch("https://afbf733ef0b7e113.mokky.dev/categorys")
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setCategorys(data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // useEffect(() => {
  //   let newCollections = [...collections]
  //   newCollections = newCollections.filter((collection) =>
  //     collection.name
  //       .toLocaleLowerCase()
  //       .includes(searchCollections.toLocaleLowerCase())
  //   );
  //   setCollections(newCollections);
  // }, [searchCollections]);

  return (
    <>
      <h1 className={styles.title}>Моя колекция фотографий</h1>
      <div className={styles.block_header}>
        <Tegs
          categorys={categorys}
          activeCategorys={activeCategorys}
          setActiveCategorys={setActiveCategorys}
        />
        <Search
          searchCollections={searchCollections}
          setSearchCollections={setSearchCollections}
        />
      </div>
      <Cards
        collections={collections}
        activeCategorys={activeCategorys}
        searchCollections={searchCollections}
      />
      <Pagination page={page} setPageCount={setPageCount}/>
    </>
  );
}
