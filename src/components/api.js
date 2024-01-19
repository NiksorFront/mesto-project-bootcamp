const config = {
    headers:{
        authorization: 'dfad8615-a69b-4969-abcf-da90e50e7e80',
        'Content-Type': 'application/json'
    }
}


function getResponse(res){
    return res.ok                                               //Если res.ok
           ? res.json()                                         //Возврщаем Promise 
           : res.json().then((err) => Promise.reject(err))      //Или ошибку
}


/*Функционал получения данных пользователя с сервера*/
export async function request(serverLink){
    const res = await fetch(serverLink, {
                     headers: { authorization: config.headers.authorization}
                     })
    
    return await getResponse(res)
}


export async function sending(serverLink, PATCHorPOST, obj){
    const res = await fetch(serverLink, {
        method: PATCHorPOST,
        headers: {
            authorization: config.headers.authorization,
            'Content-Type': config.headers["Content-Type"]
        },
        body: JSON.stringify(obj)
    })

    return await getResponse(res)
}


/*Функционал работы карточек с сервером*/

//Функция отправки лайка пользователя
export async function submitLikes(likeBut, cardId){
    if (likeBut.classList.contains("element__like_set")){
        const res = await fetch(`https://nomoreparties.co/v1/wbf-cohort-14/cards/likes/${cardId}`, {
              method: "PUT",
              headers: { authorization: config.headers.authorization}
            })
        return await getResponse(res)
        }
    else{
        const res = await fetch(`https://nomoreparties.co/v1/wbf-cohort-14/cards/likes/${cardId}`, {
              method: "DELETE",
              headers: { authorization: config.headers.authorization} 
            })
        return await getResponse(res)
        }
}

//Функция удаления карточки с сервочка
export async function deleteCardOnServer(cardId){
    const res = await fetch(`https://nomoreparties.co/v1/wbf-cohort-14/cards/${cardId}`, {
        method: "DELETE",
        headers: { authorization: config.headers.authorization},
    })
    
    return await getResponse(res)
}