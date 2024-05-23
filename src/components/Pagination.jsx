import styles from "../css/pagination.module.css";
import { memo } from "react";

function Pagination({ page, handlePageClick }) {
  return (
    <nav aria-label="Page navigation">
      <ul className={styles.block_pagination}>
        {[...Array(page.total_pages)].map((_, index) => (
          <li key={index + 1}>
            <button
              onClick={() => handlePageClick(index + 1)}
              className={`${styles.pagination} ${
                page.current_page === index + 1 ? styles.active : ""
              }`}
              aria-current={page.current_page === index + 1 ? "page" : undefined}
              aria-label={`Go to page ${index + 1}`}
            >
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}


const MemoizedPagination = memo(Pagination);

export default MemoizedPagination;