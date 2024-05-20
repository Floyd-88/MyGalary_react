import { useState } from "react";
import styles from "../../css/autorization.module.css";
import Form from "./Form";
import InputForm from "./InputForm";

export default function Autorization(props) {
  const [formErrors, setFormErrors] = useState({
    email: true,
    password: true,
  });

  return (
    <>
      <div className={styles.wrapper_form}>
        <Form
          title={"Добрый день! Вам необходимо авторизоваться!"}
          btnText_1={"Вход"}
          btnText_2={"Создать новый аккаунт"}
          formErrors={formErrors}
          setFormErrors={setFormErrors}
          props={props}
        >
          <InputForm
            type={"email"}
            name={"email"}
            placeholder={"Введите электронный адрес"}
            formErrors={formErrors}
            setFormErrors={setFormErrors}
            props={props}
          />
          <InputForm
            type={"password"}
            name={"password"}
            placeholder={"Введите пароль"}
            formErrors={formErrors}
            setFormErrors={setFormErrors}
            props={props}
          />
        </Form>
      </div>
    </>
  );
}
