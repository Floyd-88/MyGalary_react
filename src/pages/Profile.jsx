import { useState } from "react";
import Paralax from "../components/Paralax";
import styles from "../css/profile.module.css";
import { useOutletContext } from "react-router-dom";
import { USERS_URL } from "../constantsUrlAPI";
import { handleInputChange } from "../validators/formHandlers";

export default function Profile() {

  const userStorage = JSON.parse(localStorage.getItem("user_gallery")) || {};
  const tokenStorage = JSON.parse(localStorage.getItem("token_gallery")) || {};

  const [formDataEdit, setFormDataEdit] = useState({
    name: userStorage?.name || "",
    email: userStorage?.email || "",
    password: "",
  });
  const [formProfileErrors, setFormProfileErrors] = useState({});

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");

  const {setFormData, changeStore, exit} = useOutletContext();

  const handleEditProfile = async (e) => {
    e.preventDefault();

    if (!tokenStorage || !userStorage?.id) return;
    try {
      const response = await fetch(`${USERS_URL}/${userStorage?.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + tokenStorage,
        },
        body: JSON.stringify({
          name: formDataEdit.name,
          email: formDataEdit.email,
          [formDataEdit.password ? 'password' : '']: formDataEdit.password ? formDataEdit.password : '',
        }),
      });
      if (!response.ok) {
        throw new Error("Неудалось изменить данные профиля");
      }
      const data = await response.json();

      if (data) {
        const newFromData = {
            name: data.name,
            email: data.email,
            id: data.id,
            password: ""
        }
        setFormData(newFromData)
        
        localStorage.setItem("user_gallery", JSON.stringify(newFromData));
        changeStore()
        setSuccess("Данные успешно изменены!")       
      }
    } catch (error) {
      setError("Неудалось изменить данные профиля");
    }
  };

  const handleDeleteProfile = async () => {
    if (window.confirm("Вы точно хотите удалить свой профиль?")) {
      try {
        const response = await fetch(`${USERS_URL}/${userStorage?.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + tokenStorage,
            },
            body: JSON.stringify({
              name: "",
              email: "",
              password: "",
            }),
          });
        if (!response.ok) {
          throw new Error("Во время удаления профиля в возникли ошибки");
        }
        // Перенаправление на домашнюю страницу или другую страницу после удаления профиля
        exit()
      } catch (error) {
        setError("Во время удаления профиля возникли ошибки");
      }
    }
  };

  return (
    <>
      <Paralax
        // text_2={"User Profile"}
        text_btn={"Go home"}
        fone={"./paralax_1.jpg"}
        to={""}
      >
        <div className={styles.userProfile}>
          <h2>Редактировать данные</h2>
          {error && <p className={styles.errorMessage}>{error}</p>}
          {success && <p className={styles.success}>{success}</p>}

          <form onSubmit={handleEditProfile} className={styles.profileForm}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Name:</label>
              <input
                type="text"
                name="name"
                value={formDataEdit.name}
                onChange={(e) => handleInputChange(e, setFormDataEdit, setFormProfileErrors, setError, setSuccess)}
                className={styles.formInput}
              />
               {formProfileErrors["name"] && (
                <p className={styles.error_text}>{formProfileErrors["name"]}</p>
              )}
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Email:</label>
              <input
                type="email"
                name="email"
                value={formDataEdit.email}
                onChange={(e) => handleInputChange(e, setFormDataEdit, setFormProfileErrors, setError, setSuccess)}
                className={styles.formInput}
              />
               {formProfileErrors["email"] && (
                <p className={styles.error_text}>{formProfileErrors["email"]}</p>
              )}
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Password:</label>
              <input
                type="password"
                name="password"
                value={formDataEdit.password}
                onChange={(e) => handleInputChange(e, setFormDataEdit, setFormProfileErrors, setError, setSuccess)}
                className={styles.formInput}
              />
               {formProfileErrors["password"] && (
                <p className={styles.error_text}>{formProfileErrors["password"]}</p>
              )}
            </div>
            <button type="submit" className={styles.saveButton} disabled={
              Object.values(formProfileErrors).some((error) => !!error)
            }>
              Сохранить изменения
            </button>
          </form>
          <div className={styles.wrapper_deleteButton}>
            <button
              onClick={handleDeleteProfile}
              className={styles.deleteButton}
            >
              Удалить профиль
            </button>
          </div>
        </div>
      </Paralax>
    </>
  );
}
