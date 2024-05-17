import styles from "../../css/autorization.module.css";
import Form from "./Form";
import InputForm from "./InputForm";

export default function Autorization() {
  return (
    <>
      <div className={styles.wrapper_form}>
        <Form title={"Добрый день! Вам необходимо авторизоваться!"} btnText_1={"Вход"} btnText_2={"Создать новый аккаунт"}>
          <InputForm
            type={"email"}
            id={"email"}
            placeholder={"Введите электронный адрес"}
          />
          <InputForm
            type={"password"}
            id={"password"}
            placeholder={"Введите пароль"}
          />
        </Form>
      </div>
    </>
  );
}
