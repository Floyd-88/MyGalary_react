import { useEffect } from "react";
import Cards from "../components/Cards";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import Tegs from "../components/Tegs";
import styles from "../css/gallery.module.css";
import { useState } from "react";
import Paralax from "../components/Paralax";
import { useOutletContext } from "react-router-dom";
import { PHOTOS_URL, TEST_PHOTOS_URL } from "../constantsUrlAPI";

export default function Gallery() {
  const [collections, setCollections] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const [activeCategorys, setActiveCategorys] = useState(0);
  const [searchCollections, setSearchCollections] = useState("");
  const [page, setPage] = useState({});
  const [pageCount, setPageCount] = useState(1);
  const [isLoader, setIsLoader] = useState(false);

  // const user = JSON.parse(localStorage.getItem("user_gallery"))
  // const token = JSON.parse(localStorage.getItem("token_gallery"))

  const { setShowAuto, user, token } = useOutletContext();

  useEffect(() => {
    async function getCollection() {
      setIsLoader(true);
      const res = await fetch(
        `${token ? PHOTOS_URL : TEST_PHOTOS_URL}?userID=${user?.id || '*'}&sortBy=-id&page=${pageCount}&limit=8&category=${
          +activeCategorys !== 0 ? activeCategorys : "*"
        }&name=*${searchCollections}*`,
        {
          method: "GET",
          headers: {
            "Authorization": "Bearer " + token,
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        if (data) {
          if (data.items) {
            setPage(data.meta);
            setCollections(data.items);
          } else {
            setCollections([]);
          }
        }
      } else {
        console.log(res);
      }
      setIsLoader(false);
    }
    getCollection();
  }, [activeCategorys, pageCount, searchCollections, token, user?.id]);

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
      <Paralax
        text_2={"GALLERY"}
        text_btn={"Home"}
        fone={"./paralax_1.jpg"}
        to={"/"}
      />
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

        {!isLoader && collections.length > 0 ? (
          <Pagination page={page} setPageCount={setPageCount} />
        ) : (
          ""
        )}
        { !user.id ?
          <p className={styles.is_loader} >Для создания своей собственной галереи Вам необходимо <span onClick={() => setShowAuto("Войти")}>авторизоваться</span>!</p> :  
          <p
          className={`${styles.is_loader} ${
            !(collections.length === 0 && !isLoader) ? styles.display_none : ""
          }`}
        >
          Ничего не найдено
        </p>}
      </div>
    </>
  );
}
