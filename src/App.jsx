import styles from "./css/app.module.css";

import Header from "./components/Header";
// import Gallery from "./pages/Gallery";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Autorization from "./components/autorization/Autorization";
import Register from "./components/autorization/Register";

export default function App() {
  const [showAuto, setShowAuto] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [user, setUser] = useState({})

  useEffect(() => {
    const userStorage = JSON.parse(localStorage.getItem('user_gallery'));
    if (userStorage) {
      setUser(userStorage);
    } else {
      setUser({});
    }
  }, []);


  return (
    <>
      {showAuto && (
        <div className={styles.fone} onClick={() => setShowAuto("")}></div>
      )}
      {showAuto === "Войти" && (
        <Autorization
          setShowAuto={setShowAuto}
          formData={formData}
          setFormData={setFormData}
          setUser={setUser}
        />
      )}
      {showAuto === "Создать новый аккаунт" && (
        <Register
          setShowAuto={setShowAuto}
          formData={formData}
          setFormData={setFormData}
        />
      )}

      <Header user={user} setUser={setUser} setShowAuto={setShowAuto} />
      <Outlet />
    </>
  );
}
