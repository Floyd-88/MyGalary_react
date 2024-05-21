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
  const [token, setToken] = useState("")

  useEffect(() => {
    const userStorage = JSON.parse(localStorage.getItem('user_gallery'));
    const tokenStorage = JSON.parse(localStorage.getItem("token_gallery"))
    if (userStorage && tokenStorage) {
      setUser(userStorage);
      setToken(tokenStorage)
    } else {
      setUser({});
      setToken("")
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
          setToken={setToken}
        />
      )}
      {showAuto === "Создать новый аккаунт" && (
        <Register
          setShowAuto={setShowAuto}
          formData={formData}
          setFormData={setFormData}
          setUser={setUser}
          setToken={setToken}
        />
      )}

      <Header user={user} setUser={setUser} setShowAuto={setShowAuto} />
      <Outlet context={{ setShowAuto, user, token }}/>
    </>
  );
}
