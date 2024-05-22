import styles from "../css/pagination.module.css";

export default function Pagination({page, handlePageClick}) {

  return (
    <>
      <ul className={styles.block_pagination}>
        {[...Array(page.total_pages)].map((_, index) => (
        <li onClick={() => handlePageClick(index+1)} key={index+1} className={`${styles.pagination} ${page.current_page === index+1 ? styles.active : ''}`}>{index+1}</li>
        ))}
      </ul>
    </>
  );
}
