import { useEffect } from "react";
import Cards from "../components/Cards";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import Tegs from "../components/Tegs";
import styles from "../css/gallery.module.css";
import { useState } from "react";
import Paralax from "../components/Paralax";

export default function Gallery() {
  const [collections, setCollections] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const [activeCategorys, setActiveCategorys] = useState(0);
  const [searchCollections, setSearchCollections] = useState("");
  const [page, setPage] = useState({});
  const [pageCount, setPageCount] = useState(1);
  const [isLoader, setIsLoader] = useState(false);


  useEffect(() => {
    setIsLoader(true);
    fetch(
      `https://afbf733ef0b7e113.mokky.dev/photos_collections?page=${pageCount}&limit=8&category=${
        +activeCategorys !== 0 ? activeCategorys : "*"
      }&name=*${searchCollections}*`
    )
      .then((response) => response.json())
      .then((data) => {
        setPage(data.meta);
        if (data.items.length > 0) {
          setCollections(data.items);
        } else {
          setCollections([]);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoader(false));
  }, [activeCategorys, pageCount, searchCollections]);

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
  return (
    <>
    <Paralax  text_2={'GALLERY'} text_btn={"Home"} fone={"./paralax_1.jpg"} to={"/"}/>
      <div className={styles.container}>
        <div className={styles.block_header}>
          <Tegs
            categorys={categorys}
            activeCategorys={activeCategorys}
            setActiveCategorys={setActiveCategorys}
            setPageCount={setPageCount}
          />
          <Search
            searchCollections={searchCollections}
            setSearchCollections={setSearchCollections}
            setPageCount={setPageCount}
          />
        </div>
        {!isLoader ? (
          <Cards
            collections={collections}
            activeCategorys={activeCategorys}
            searchCollections={searchCollections}
          />
        ) : (
          <p className={styles.is_loader}>Идет загрузка...</p>
        )}

        {!isLoader ? (
          <Pagination page={page} setPageCount={setPageCount} />
        ) : (
          ""
        )}
        <p
          className={`${styles.is_loader} ${
            !(collections.length === 0 && !isLoader) ? styles.display_none : ""
          }`}
        >
          Ничего не найдено
        </p>
      </div>
    </>
  );
}
