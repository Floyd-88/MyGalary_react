import styles from "../css/search.module.css";

export default function Search({searchCollections, setSearchCollections, setPageCount}) {

  return (
    <>
    <div className={styles.search_block}>
    <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      <input value={searchCollections} onInput={(e) => {
        setSearchCollections(e.target.value)
        setPageCount(1)
        }} className={styles.searchCards} type="text"  placeholder="Поиск по названию"/>
    </div>
    
    </>
  );
}
