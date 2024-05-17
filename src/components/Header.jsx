import { NavLink } from "react-router-dom";
import styles from "../css/header.module.css";

export default function Header({setShowAuto}) {
  return (
    <div className={styles.header}>
      {/* <h1 className={styles.title}>Photo gallery</h1> */}
      <ul className={styles.block_nav_items}>
        <NavLink to={`/`}>HOME</NavLink>
        <NavLink to={`gallery`}>GALLERY</NavLink>
        <NavLink to={`services`}>SERVICES</NavLink>
        <NavLink to={`upload`}>
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
              d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
            />
          </svg>
          <p>UPLOAD</p>
        </NavLink>
        <NavLink to={`blog`}>BLOG</NavLink>
        <NavLink to={`about`}>ABOUT</NavLink>
        <NavLink to={`contact`}>CONTACT</NavLink>
      </ul>
      {true ? (<div className={styles.wrapper_login}>
        <img src="./come.svg" alt="" />
        <button onClick={() => setShowAuto(true)}>войти</button>
      </div>) :
      (<div className={styles.wrapper_exit}>
        <p className={styles.text_welcome}>Здраствуйте, <span>Илья</span></p>
        <a className={styles.exit} href="">Выход</a>
      </div>)
      }
    </div>
  );
}
