import styles from "./css/app.module.css";

import Header from "./components/Header";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Autorization from "./components/autorization/Autorization";
import Register from "./components/autorization/Register";
import { exitUser } from "./ServerRequest";

export default function App() {
  const [showAuto, setShowAuto] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [user, setUser] = useState({})
  const [token, setToken] = useState("")
  const [categorys, setCategorys] = useState([]);

  const navigate = useNavigate()


  function changeStore() {
    try {
      const userStorage = JSON.parse(localStorage.getItem('user_gallery')) || {};
      const tokenStorage = localStorage.getItem("token_gallery") || "";
      setUser(userStorage);
      setToken(tokenStorage);
    } catch (error) {
      console.error("Error parsing local storage data:", error);
    }
  }

  useEffect(() => {
    changeStore()
  }, []);

  function exit() {
    exitUser();
    setUser({});

    setFormData({
      name: "",
      email: "",
      password: "",
    })
    navigate("/MyGalary_react/");
  }


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

      <Header user={user} setUser={setUser} setShowAuto={setShowAuto} setFormData={setFormData} exit={exit}/>
      <Outlet context={{ setShowAuto, user, token, categorys, setCategorys, setFormData, changeStore, exit }}/>
    </>
  );
}
