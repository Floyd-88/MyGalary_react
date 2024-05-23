import { REGISTER_URL, AUTH_URL } from "./constantsUrlAPI.js";

//РЕГИСТРАЦИЯ ПОЛЬЗОВАТЕЛЯ
export async function registerUser(data) {
  try {
    // Проверка заполненности данных
    if (!data.name || !data.email || !data.password) {
      throw new Error("Данные не заполнены");
    }

    // Подготовка тела запроса
    let body = JSON.stringify({
      name: data.name.trim(),
      email: data.email.trim(),
      password: data.password.trim(),
    });

    // Отправка запроса
    const response = await fetch(REGISTER_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: body,
    });

    // Проверка статуса ответа
    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }

    // Обработка успешного ответа
    const result = await response.json();
    if (result.token) {
      saveUserData(result.token, result.data);
      return result;
    }
  } catch (error) {
    console.error("Ошибка при регистрации пользователя:", error);
    throw error;
  }
}

//АВТОРИЗАЦИЯ ПОЛЬЗОВАТЕЛЯ
export async function authorizationUser(data) {
  try {
    if (!data.email || !data.password) {
      throw new Error("Необходимо заполнить поля");
    }

    let body = JSON.stringify({
      email: data.email.trim(),
      password: data.password.trim(),
    });

    const response = await fetch(AUTH_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: body,
    });

    // Проверка статуса ответа
    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }
    // Обработка успешного ответа
    const result = await response.json();

    if (result.token) {
      saveUserData(result.token, result.data);
      return result;
    }
  } catch (error) {
    console.error("Ошибка при авторизации пользователя:", error);
    throw error;
  }
}

//ВЫХОД ПОЛЬЗОВАТЕЛЯ
export function exitUser() {
  localStorage.removeItem("user_gallery");
  localStorage.removeItem("token_gallery");
}

//ПОЛУЧЕНИЕ КАТЕГОРИЙ
export async function fetchCategories() {
  try {
    const response = await fetch(
      "https://afbf733ef0b7e113.mokky.dev/categorys"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data.length > 0) {
      return data;
    }
  } catch (error) {
    throw new Error(`Ошибка при выполнении запроса: ${error.message}`);
  }
}

//СОХРАНЕНИЕ ДАННЫХ В LOCALSTORAGE
function saveUserData(token, userData) {
  localStorage.setItem("token_gallery", JSON.stringify(token));
  localStorage.setItem("user_gallery", JSON.stringify(userData));
}
