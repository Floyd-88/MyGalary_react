import { useRouteError } from "react-router-dom";
import styles from '../css/error-page.module.css'
export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className={styles.block_errors} id="error-page">
      <h1>Oops!</h1>
      <p className={styles.title}>Извините, непредвиденная ошибка!</p>
      <p className={styles.error}>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}