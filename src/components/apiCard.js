/*Функционал работы карточек с сервером*/

//Функция отправки лайка пользователя
export function likeSubmit(likeBut, cardId){
    if (likeBut.classList.contains("element__like_set")){
        fetch(`https://nomoreparties.co/v1/wbf-cohort-14/cards/likes/${cardId}`, {
              method: "PUT",
              headers: { authorization: 'dfad8615-a69b-4969-abcf-da90e50e7e80' } }
        )
        .catch((err) => {console.log(err)})
        }
    else{
        fetch(`https://nomoreparties.co/v1/wbf-cohort-14/cards/likes/${cardId}`, {
              method: "DELETE",
              headers: { authorization: 'dfad8615-a69b-4969-abcf-da90e50e7e80' } }
        )
        .catch((err) => {console.log(err)})
        }
}

//Функция отправление новой карточки на сервер
export function formSubmitCard(nameInput, linkInput){
    return fetch('https://nomoreparties.co/v1/wbf-cohort-14/cards', {
        method: "POST",
        headers: {
            authorization: 'dfad8615-a69b-4969-abcf-da90e50e7e80',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            name: nameInput,
            link: linkInput,
        })
    }).catch((err) => {console.log(err)})
      
}


//Функция удаления карточки с сервочка
export function deleteCardOnServer(cardId){
    fetch(`https://nomoreparties.co/v1/wbf-cohort-14/cards/${cardId}`, {
        method: "DELETE",
        headers: { authorization: 'dfad8615-a69b-4969-abcf-da90e50e7e80'},
    })
    .catch((err) => {console.log(err)})
}