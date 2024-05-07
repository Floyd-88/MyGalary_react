import { useEffect } from "react";
import Cards from "./components/Cards";
import Pagination from "./components/Pagination";
import Search from "./components/Search";
import Tegs from "./components/Tegs";
import styles from "./css/app.module.css";
import { useState } from "react";

export default function App() {
  const [collections, setCollections] = useState([])
  const [categorys, setCategorys] = useState([])
  const [activeCategorys, setActiveCategorys] = useState(0)


  useEffect(() => {
    fetch('https://afbf733ef0b7e113.mokky.dev/photos_collections')
    .then((response) => response.json())
    .then((data) => {
      if(data.length > 0) {
        setCollections(data)
      }
    })
    .catch((err) => console.log(err)) 
  }, [])

  useEffect(() => {
    fetch('https://afbf733ef0b7e113.mokky.dev/categorys')
    .then((response) => response.json())
    .then((data) => {
      if(data.length > 0) {
        setCategorys(data)
      }
    })
    .catch((err) => console.log(err)) 
  }, [])
 
  return (
    <>
      <h1 className={styles.title}>Моя колекция фотографий</h1>
      <div className={styles.block_header}>
        <Tegs categorys={categorys} activeCategorys={activeCategorys} setActiveCategorys={setActiveCategorys}/>
        <Search />
      </div>
      <Cards collections={collections} activeCategorys={activeCategorys}/>
      <Pagination />
    </>
  );
}
