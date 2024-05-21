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
import ShowPhoto from "../components/ShowPhoto";

export default function Gallery() {
  const [collections, setCollections] = useState([{
    "category": 14,
    "name": "Музыка",
    "photos": [
      "https://firebasestorage.googleapis.com/v0/b/gallery-33436.appspot.com/o/images%2F1716233563686_apcm_photomix2_0093.jpg?alt=media&token=a81d77f9-44e4-40c4-b7c1-ba11c3b74f51",
      "https://firebasestorage.googleapis.com/v0/b/gallery-33436.appspot.com/o/images%2F1716233563686_apcm_photomix2_0091.jpg?alt=media&token=a8e3afc4-ab77-4210-bed7-805be25b4e4a",
      "https://firebasestorage.googleapis.com/v0/b/gallery-33436.appspot.com/o/images%2F1716233563686_apcm_photomix2_0092.jpg?alt=media&token=c0aa0a5c-35bc-476a-bfb7-2385af727531",
      "https://firebasestorage.googleapis.com/v0/b/gallery-33436.appspot.com/o/images%2F1716233563685_apcm_photomix2_0090.jpg?alt=media&token=05432f74-de81-4ed3-accc-a09375b664b7"
    ],
    "userID": 1,
    "id": 1,
    "user": {
      "name": "alex",
      "email": "aaa@mail.ru",
      "id": 2
    }
  },
  {
    "category": 20,
    "name": "Природа",
    "photos": [
      "https://firebasestorage.googleapis.com/v0/b/gallery-33436.appspot.com/o/images%2F1716233605152_apcm_photomix2_0019.jpg?alt=media&token=de0c4c71-2a7f-4794-9f64-896999a8f717",
      "https://firebasestorage.googleapis.com/v0/b/gallery-33436.appspot.com/o/images%2F1716233605150_apcm_photomix2_0017.jpg?alt=media&token=4d086540-a492-4c3c-aa85-5eb776292628",
      "https://firebasestorage.googleapis.com/v0/b/gallery-33436.appspot.com/o/images%2F1716233605152_apcm_photomix2_0020.jpg?alt=media&token=ae618ede-5b98-454f-a4a4-f5e234df3554",
      "https://firebasestorage.googleapis.com/v0/b/gallery-33436.appspot.com/o/images%2F1716233605151_apcm_photomix2_0018.jpg?alt=media&token=3838a690-5c47-4734-8fe5-c333284eb3f9"
    ],
    "userID": 1,
    "id": 2,
    "user": {
      "name": "boris",
      "email": "bbb@mail.ru",
      "id": 3
    }
  }]);
  const [categorys, setCategorys] = useState([]);
  const [activeCategorys, setActiveCategorys] = useState(0);
  const [searchCollections, setSearchCollections] = useState("");
  const [page, setPage] = useState({});
  const [pageCount, setPageCount] = useState(1);
  const [isLoader, setIsLoader] = useState(false);

  const { setShowAuto, user, token } = useOutletContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const [errorAuth, setErrorAuth] = useState("")

  const openModal = (photo) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPhoto(null);
  };

  useEffect(() => {
    async function getCollection() {
      setIsLoader(true);
      try {
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

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        if (data && data.items) {
          setPage(data.meta);
          setCollections(data.items);
        } else {
          setCollections([]);
        }
      } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);

          setErrorAuth("Возникли проблемы с сервером, повторите попытку позже")
        
      } finally {
        setIsLoader(false);
      }
    }
    getCollection();

    return () => {
      setErrorAuth("");
    };
  }, [activeCategorys, pageCount, searchCollections, token, user?.id]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("https://afbf733ef0b7e113.mokky.dev/categorys");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.length > 0) {
          setCategorys(data);
        }
      } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
      }
    }

    fetchCategories();
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
            openModal={openModal}
          />
        ) : (
          <p className={styles.is_loader}>Идет загрузка...</p>
        )}

        <ShowPhoto isModalOpen={isModalOpen} selectedPhoto={selectedPhoto} closeModal={closeModal}/>
        {<p className={styles.error_text}>{errorAuth}</p>}
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
