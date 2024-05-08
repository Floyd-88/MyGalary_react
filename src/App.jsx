import styles from "./css/app.module.css";

import Header from "./components/Header";
// import Gallery from "./pages/Gallery";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <>
      <Header />
      {/* <div className={styles.container}> */}
        <Outlet/>
      {/* </div> */}
    </>
  );
}
