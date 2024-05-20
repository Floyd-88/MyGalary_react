import { REGISTER_URL } from "./constantsUrlAPI.js";

//регистрация нового пользователя
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
        return result
}

//   //авторизация пользователя
// async authorizationUser(data) {
//     try {
//       if (!data.email || !data.password) {
//         console.log('Необходимо заполнить поля')
//         return
//       }
//       let body = JSON.stringify({
//         email: data.email,
//         password: data.password
//       })

//       await axios
//         .post(AUTH_URL, body, {
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json"
//           }
//         })
//         .then(({data}) => {
//           if (data.token) {
//             localStorage.setItem('token', JSON.stringify(data.token))

//             this.user = data.data
//             localStorage.setItem('user', JSON.stringify(this.user))
//             this.showAuto = false
//             console.log(data)
//           } else {
//             console.log('Пользователь не найден')
//           }
//         })
//     } catch (err) {
//       if(err.response?.data?.message === 'RESOURCE_INVALID_LOGIN_OR_PASSWORD') {
//         this.errorAuth = "Пользователя с таким логином или паролем не найдено"
//       }

//     }
//   }

// //выход пользователя
// async exitUser() {
//     this.user = {}
//     localStorage.setItem('user', null)
//     localStorage.setItem('token', null)
//   }
// }
