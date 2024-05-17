import styles from "./css/app.module.css";

import Header from "./components/Header";
// import Gallery from "./pages/Gallery";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Autorization from "./components/autorization/Autorization";
import Register from "./components/autorization/Register";

export default function App() {
  const [showAuto, setShowAuto] = useState(false);
  return (
    <>
      {showAuto && (
        <div className={styles.fone} onClick={() => setShowAuto(false)}></div>
      )}
      {/* {showAuto && <Autorization />} */}
      {showAuto && <Register />}

      <Header setShowAuto={setShowAuto} />
      <Outlet />
    </>
  );
}
