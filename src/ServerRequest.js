import { REGISTER_URL, AUTH_URL } from "./constantsUrlAPI.js";

//РЕГИСТРАЦИЯ ПОЛЬЗОВАТЕЛЯ
export async function registerUser(data) {
  // Проверка заполненности данных
  if (!data.name || !data.email || !data.password) {
    console.log("Данные не заполнены");
    return;
  }
  // Подготовка тела запроса
  let body = JSON.stringify({
    name: data.name,
    email: data.email,
    password: data.password,
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
    localStorage.setItem("token_gallery", JSON.stringify(result.token));
    localStorage.setItem("user_gallery", JSON.stringify(result.data));
    return result;
  }
}

//АВТОРИЗАЦИЯ ПОЛЬЗОВАТЕЛЯ
export async function authorizationUser(data) {
  if (!data.email || !data.password) {
    console.log("Необходимо заполнить поля");
    return;
  }
  let body = JSON.stringify({
    email: data.email,
    password: data.password,
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
    localStorage.setItem("token_gallery", JSON.stringify(result.token));
    localStorage.setItem("user_gallery", JSON.stringify(result.data));
    return result;
  }
}


//ВЫХОД ПОЛЬЗОВАТЕЛЯ
export function exitUser() {
    localStorage.setItem('user_gallery', null)
    localStorage.setItem('token_gallery', null)
  }
