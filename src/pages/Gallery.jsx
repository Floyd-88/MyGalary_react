import { useEffect, useRef } from "react";
import Cards from "../components/Cards";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import Tegs from "../components/Tegs";
import styles from "../css/gallery.module.css";
import { useState } from "react";
import Paralax from "../components/Paralax";
import { useOutletContext } from "react-router-dom";
import { PHOTOS_URL, TEST_PHOTOS_URL } from "../constantsUrlAPI";
import ShowPhoto from "../components/ShowPhoto";
import Loader from "../components/Loader";

export default function Gallery() {
  const [collections, setCollections] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const [activeCategorys, setActiveCategorys] = useState(0);
  const [searchCollections, setSearchCollections] = useState("");
  const [page, setPage] = useState({});
  const [pageCount, setPageCount] = useState(1);
  const [isLoader, setIsLoader] = useState(false);

  const { setShowAuto, user } = useOutletContext();
  const token = JSON.parse(localStorage.getItem("token_gallery"));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const [errorAuth, setErrorAuth] = useState("");
  const [errorAuthRemove, setErrorAuthRemove] = useState("");

  const containerRef = useRef(null);

  const openModal = (photo) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
    setErrorAuth("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPhoto(null);
  };

  useEffect(() => {
    if (token === undefined || user === undefined) return;
    async function getCollection() {
      setIsLoader(true);
      try {
        const url = token
          ? `${PHOTOS_URL}?photos=https*&userID=${user?.id}&sortBy=-id&page=${pageCount}&limit=8&category=${+activeCategorys !== 0 ? activeCategorys : "*"}&name=*${searchCollections}*`
          : `${TEST_PHOTOS_URL}?photos=https*&userID=*&sortBy=-id&page=${pageCount}&limit=8&category=${+activeCategorys !== 0 ? activeCategorys : "*"}&name=*${searchCollections}*`;

        const headers = token ? { Authorization: "Bearer " + token } : {};

        const res = await fetch(url, {
          method: "GET",
          headers,
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        if (data.items && data.items.length > 0) {
          setPage(data.meta);
          setCollections(data.items);
        }
      } catch (error) {
        console.error("Ошибка при выполнении запроса:", error);
        setErrorAuth("Возникли проблемы с сервером, повторите попытку позже");
      } finally {
        setIsLoader(false);
      }
    }

    getCollection();

    return () => {
      setErrorAuth("");
    };
  }, [activeCategorys, pageCount, searchCollections, token, user]);
  
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(
          "https://afbf733ef0b7e113.mokky.dev/categorys"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.length > 0) {
          setCategorys(data);
        }
      } catch (error) {
        console.error("Ошибка при выполнении запроса:", error);
      }
    }

    fetchCategories();
  }, []);

  async function removePhoto() {
    const newCollection = selectedPhoto.collection.photos;
    const newPhotos = newCollection.filter(
      (photo) => photo !== selectedPhoto.photoSrc
    );
    try {
      const res = await fetch(`${PHOTOS_URL}/${selectedPhoto.collection.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ photos: newPhotos }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      if (data) {
        const newCollections = collections.map((collection) => {
          if (collection.id === data.id) {
            return data;
          }
          return collection;
        });
        setCollections(newCollections);
        closeModal();
      }
    } catch (error) {
      console.error("Ошибка при выполнении запроса:", error);
      setErrorAuthRemove("Для удаления фотографий необходимо авторизоваться");
    }
  }

  const handlePageClick = (pageNumber) => {
    setPageCount(pageNumber);
    setTimeout(() => {
      window.scrollTo({
        top: containerRef.current.offsetTop,
        behavior: 'smooth',
      });

    }, 0)
  };

  return (
    <>
      <Paralax
        text_2={"GALLERY"}
        text_btn={"Home"}
        fone={"./paralax_1.jpg"}
        to={"/"}
      />
      <div ref={containerRef}></div>
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
          <Cards collections={collections} openModal={openModal} />
        ) : (
          <div className={styles.wrapper_loader}><Loader /></div>
          
        )}

        <ShowPhoto
          isModalOpen={isModalOpen}
          selectedPhoto={selectedPhoto}
          closeModal={closeModal}
          removePhoto={removePhoto}
          errorAuthRemove={errorAuthRemove}
        />
        {<p className={styles.error_text}>{errorAuth}</p>}
        {!isLoader && collections.length > 0 ? (
          <Pagination page={page} handlePageClick={handlePageClick} />
        ) : (
          ""
        )}
        {!user.id ? (
          <p className={styles.is_loader}>
            Для создания своей собственной галереи Вам необходимо{" "}
            <span onClick={() => setShowAuto("Войти")}>авторизоваться</span>!
          </p>
        ) : (
          <p
            className={`${styles.is_loader} ${
              !(collections.length === 0 && !isLoader)
                ? styles.display_none
                : ""
            }`}
          >
            Ничего не найдено
          </p>
        )}
      </div>
    </>
  );
}
