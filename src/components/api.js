const config = {
    baseUrl: "https://nomoreparties.co/v1/wbf-cohort-14",
    authorization: 'dfad8615-a69b-4969-abcf-da90e50e7e80',
    'Content-Type': 'application/json'
}

function getResponse(res){
    return res.ok                                               //Если res.ok
           ? res.json()                                         //Возврщаем Promise 
           : res.json().then((err) => Promise.reject(err))      //Или ошибку
}


//Получения данных
export async function request(endpoint){
    const res = await fetch(`${config.baseUrl}/${endpoint}`, {
                             headers: { authorization: config.authorization}
                           })
    
    return await getResponse(res)
}


//Отправка данных
export async function sending(endpoint, PATCHorPOST, obj){
    const res = await fetch(`${config.baseUrl}/${endpoint}`, {
                             method: PATCHorPOST,
                             headers: {
                                authorization: config.authorization,
                                'Content-Type': config["Content-Type"]
                             },
                             body: JSON.stringify(obj)
                           })

    return await getResponse(res)
}


/*Функционал работы карточек с сервером*/

//Отправка лайка пользователя
export async function submitLike(endpoint, PUTorDELETE, cardId){
    const res = await fetch(`${config.baseUrl}/${endpoint}/${cardId}`, {
                             method: PUTorDELETE,
                             headers: { authorization: config.authorization}
                           })

    return await getResponse(res)
}


//Удаления карточки с сервочка
export async function deleteCardOnServer(endpoint, cardId){
    const res = await fetch(`${config.baseUrl}/${endpoint}/${cardId}`, {
                             method: "DELETE",
                             headers: { authorization: config.authorization},
                           })
    
    return await getResponse(res)
}