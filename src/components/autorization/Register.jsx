import styles from "../../css/register.module.css";
import Form from "./Form";
import InputForm from "./InputForm";

export default function Register() {
  return (
    <>
      <div className={styles.wrapper_form}>
        <Form
          title={"Создать новую учетную запись!"}
          btnText_1={"Регистрация"}
          btnText_2={"Войти"}
        >
          <InputForm
            type={"text"}
            id={"name"}
            placeholder={"Введите свое имя"}
          />
          <InputForm
            type={"text"}
            id={"login"}
            placeholder={"Введите свой логин"}
          />
          <InputForm
            type={"email"}
            id={"email"}
            placeholder={"Введите электронный адрес"}
          />
          <InputForm
            type={"password"}
            id={"password"}
            placeholder={"Придумайте пароль"}
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
