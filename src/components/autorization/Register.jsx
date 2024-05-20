import { useState } from "react";
import styles from "../../css/register.module.css";
import Form from "./Form";
import InputForm from "./InputForm";

export default function Register(props) {
  const [formErrors, setFormErrors] = useState({
    name: true,
    email: true,
    password: true,
  });
  return (
    <>
      <div className={styles.wrapper_form}>
        <Form
          title={"Создать новую учетную запись!"}
          btnText_1={"Регистрация"}
          btnText_2={"Войти"}
          formErrors={formErrors}
          setFormErrors={setFormErrors}
          props={props}
        >
          <InputForm
            type={"text"}
            name={"name"}
            placeholder={"Введите свое имя"}
            formErrors={formErrors}
            setFormErrors={setFormErrors}
            props={props}
          />
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
            placeholder={"Придумайте пароль"}
            formErrors={formErrors}
            setFormErrors={setFormErrors}
            props={props}
          />

          {/* <h2 className={styles.success}>
            Вы успешно зарегестрировались и теперь можете войти под своей
            учетной записью!
          </h2> */}
        </Form>
      </div>
    </>
  );
}
