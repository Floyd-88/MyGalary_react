import styles from "../../css/form.module.css";
import BtnForm from "./BtnForm";

import { registerUser, authorizationUser } from "../../ServerRequest.js";
import { useState } from "react";

export default function Form({
  children,
  title,
  btnText_1,
  btnText_2,
  formErrors,
  setFormErrors,
  props,
}) {
  const [errorAuth, setErrorAuth] = useState("")

  function resetFormData() {
    props.setFormData({
      name: "",
      email: "",
      password: "",
    });
    setFormErrors((prev) => prev.map(elem => elem ? elem = true : elem));

    setErrorAuth("")
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const isFormValid = Object.values(formErrors).every(
      (error) => error === ""
    );

    if (isFormValid) {
      if (btnText_1 === "Регистрация") {
        registerUser(props.formData)
          .then((data) => {
            console.log("Успешный ответ:", data);
            resetFormData()
            props.setShowAuto("")
            props.setUser(data.data)
            props.setToken(data.token)
          })
          .catch((error) => {
            console.error("Ошибка запроса:", error);
            if (error?.message === "RESOURCE_USER_ALREADY_EXISTS") {
              setErrorAuth("Пользователь с такой почтой уже зарегистрирован");
            }
          });
      } else {
        authorizationUser(props.formData)
        .then((data) => {
          console.log("Успешный ответ:", data);
          resetFormData()
          props.setShowAuto("")
          props.setUser(data.data)
          props.setToken(data.token)
        })
        .catch((error) => {
          console.error("Ошибка запроса:", error);
          if(error?.message === 'RESOURCE_INVALID_LOGIN_OR_PASSWORD') {
            setErrorAuth("Пользователя с таким логином или паролем не найдено")
          }
        });
      }
    } else {
      console.log("Форма содержит ошибки в полях ввода");
    }
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <h2 className={styles.title}>{title}</h2>
        {children}
        <BtnForm
          disabled={Object.values(formErrors).some((formError) => formError)}
        >
          {btnText_1}
        </BtnForm>
        <div>
          <p className={styles.error_text}>{errorAuth}</p>
          <button
            className={styles.form_btn_reg}
            onClick={() => {
              props.setShowAuto(btnText_2);
              resetFormData();
            }}
          >
            {btnText_2}
          </button>
        </div>
      </form>
    </>
  );
}
