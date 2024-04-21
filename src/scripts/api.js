// // Получение информации о ползователе с сервера 
// const configApi = {
//     myUrl: 'https://nomoreparties.co/v1/wff-cohort-11',
//     headers: {
//         authorization: '2af85461-a603-4098-9fac-6ccfa725f3c5',
//         'Content-Type': 'application/json'
//     }
// };

// // Проверка подключения к серверу
// const checkApi = (res) => {
//     if(res.ok) {
//         return res.json()
//     } return Promise.reject(`Ошибка. Запрос не выполнен ${res.status}`)
// }

// // Получение карточек с сервера
// async function getCards () {
//     return fetch (`${configApi.myUrl}/cards`, {
//         headers: configApi.headers
//     })
//     .then((res) => checkApi(res))
//     .catch((err) => {
//         return err
//     });
// };

// // Закрузка профиля с сервера
// async function getUser () {
//     return fetch(`${configApi.myUrl}/users/me`,{
//         headers: configApi.headers
//     })
//     .then((res) => checkApi(res))
//     .catch((err) => {
//         return err
//     });
// }

// // Редактирование профиля
// async function postMe (title, descr) {
//     return fetch(`${configApi.myUrl}/users/me`, {
//         method: 'PATCH',
//         headers: configApi.headers,
//         body: JSON.stringify({
//             name: title,
//             about: descr
//         })
//     })
//     .then((res) => checkApi(res))
//     .catch((err) => {
//         return err
//     });
// };
// // Добавление новой карточки
// async function postCards (name, link) {
//     return fetch (`${configApi.myUrl}/cards/`, {
//         method: 'POST',
//         headers: configApi.headers,
//         body: JSON.stringify({
//             name: name,
//             link: link
//         })
//     })
//     .then((res) => checkApi(res))
//     .catch((err) => {
//         return err
//     })
// };

// // Удаление карточки
// async function deleteCardApi (cardId) {
//     fetch(`${configApi.myUrl}/cards/${cardId}`), {
//         method: "DELETE",
//         headers: configApi.headers
//     }
//     .then((res) => checkServer(res))
//     .catch((err) => {
//         return err
//     });
// };

// // Постановка лайка
// async function putLike(cardId) {
//     return fetch(`${configApi.myUrl}/cards/like${cardId}`, {
//         method: "PUT",
//         headers: configApi.headers
//     })
//     .then((res) => checkApi(res))
//     .catch((err) => {
//         return err
//     });
// };

// // Удаление лайка 
// async function deleteLike(cardId) {
//     return fetch(`${configApi.myUrl}/cards/likes/${cardId}`, {
//         method: "DELETE",
//         headers: configApi.headers
//     })
//     .then((res) => checkApi(res))
//     .catch((err) => {
//         return err
//     });
// }

// // Обновление аватара пользователя 
// async function patchUser (url) {
//     fetch(`${configApi.myUrl}/users/me/avatar`, {
//         method: 'PATCH',
//         headers: config.headers,
//         body: JSON.stringify({
//           avatar: url
//         })
//     })
//     .then((res) => checkApi(res))
//     .catch((err) => {
//         return err
//     })
// }

const configApi = {
    myUrl: 'https://nomoreparties.co/v1/wff-cohort-11',
    headers: {
        authorization: '2af85461-a603-4098-9fac-6ccfa725f3c5',
        'Content-Type': 'application/json'
    }
};

const checkApi = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка. Запрос не выполнен ${res.status}`);
};

async function getCards() {
    return fetch(`${configApi.myUrl}/cards`, {
            headers: configApi.headers
        })
        .then((res) => checkApi(res))
        .catch((err) => {
            return err;
        });
};

async function getUser() {
    return fetch(`${configApi.myUrl}/users/me`, {
            headers: configApi.headers
        })
        .then((res) => checkApi(res))
        .catch((err) => {
            return err;
        });
}

async function postMe(title, descr) {
    return fetch(`${configApi.myUrl}/users/me`, {
            method: 'PATCH',
            headers: configApi.headers,
            body: JSON.stringify({
                name: title,
                about: descr
            })
        })
        .then((res) => checkApi(res))
        .catch((err) => {
            return err;
        });
};

async function postCards(name, link) {
    return fetch(`${configApi.myUrl}/cards/`, {
            method: 'POST',
            headers: configApi.headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
        .then((res) => checkApi(res))
        .catch((err) => {
            return err;
        })
};

async function deleteCardApi(cardId) {
    return fetch(`${configApi.myUrl}/cards/${cardId}`), {
            method: "DELETE",
            headers: configApi.headers
        }
        .then((res) => checkApi(res))
        .catch((err) => {
            return err;
        });
};

async function putLike(cardId) {
    return fetch(`${configApi.myUrl}/cards/like${cardId}`, {
            method: "PUT",
            headers: configApi.headers
        })
        .then((res) => checkApi(res))
        .catch((err) => {
            return err;
        });
};

async function deleteLike(cardId) {
    return fetch(`${configApi.myUrl}/cards/likes/${cardId}`, {
            method: "DELETE",
            headers: configApi.headers
        })
        .then((res) => checkApi(res))
        .catch((err) => {
            return err;
        });
}

async function patchUser(url) {
    return fetch(`${configApi.myUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: configApi.headers,
            body: JSON.stringify({
                avatar: url
            })
        })
        .then((res) => checkApi(res))
        .catch((err) => {
            return err;
        })
}

export {getCards, getUser, postCards, postMe, deleteCardApi, putLike, deleteLike, patchUser}