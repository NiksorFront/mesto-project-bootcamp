import {closePopup, openPopup} from "./modal"
import {submitLike, deleteCardOnServer} from "./api"


/*Функционал открытия картинки во весь экран*/
//Подключаем все переменные, нужная для октрытия изображения на весь экран
const formImg = document.getElementById('big-img');
const img = formImg.querySelector('.form__img');
const formImgTitle = formImg.querySelector('.form_img__title');
const buttonPopupClose_img = formImg.querySelector(".popup__close");
buttonPopupClose_img.addEventListener('click', () => closePopup(formImg)); //Закрывем по клику на крестик


/*Функционал окошка удаления карточки*/
const deleteCardPopup = document.getElementById("delete-card");
const buttonDeleteCard = deleteCardPopup.querySelector(".form__button-submit");
const buttonPopupClose_delete = deleteCardPopup.querySelector(".popup__close");

buttonPopupClose_delete.addEventListener('click', () => { closePopup(deleteCardPopup) });        //Закрывем по клику на крестик
buttonDeleteCard.addEventListener('click', deleteCard);


let idCardForDelete;
let cardForDelete;

//Функция создания каротчки
const sampleCard  = document.getElementById("card-template").content.querySelector('.element');
export function createCard(cardInfo, userId){
    const card = sampleCard.cloneNode(true);
    const image = card.querySelector(".element__img");
    const like = card.querySelector(".element__like");
    const trash = card.querySelector(".element__delete");
    const likeNumbers = card.querySelector(".element__number-of-like");

    card.querySelector(".element__title").textContent = cardInfo.name;
    image.alt = cardInfo.name;
    image.src = cardInfo.link;

    /*Функционал лайка*/
    likeNumbers.textContent = cardInfo.likes.length
    const likeOwner = cardInfo.likes.map((like) => like._id);                         //Id всех пользователей поставивших лайк.
    if (likeOwner.includes(userId)){                                                  //Проверяем поставлен ли нанешним посителем лайк
        like.classList.add("element__like_set")                                       //Если да, то отображем это
    }

    like.addEventListener('click', () => likeSet(like, likeNumbers, cardInfo._id));   


    /*Функционал удаления карточки*/
    if(cardInfo.owner._id === userId){
        trash.addEventListener('click', () => {
            openPopup(deleteCardPopup)  
            idCardForDelete = cardInfo._id
            cardForDelete = card
        })}
    else{ 
        trash.remove();  //удаляем корзинку с глаз долой из вёрстки вон, т.к. она не наша и удалять чужую картинку мы не в праве.
    }  


    /*Функционал открытия большой картинки*/
    card.querySelector("#card-image").addEventListener('click', (evt) => {big_img(evt.target)})

    return card
}

function deleteCard(){
    buttonDeleteCard.textContent = "Удаление...";   

    deleteCardOnServer("cards", idCardForDelete)         //Удаляем карточку с сервера
    .then(() => {
        cardForDelete.remove()                  //Удаляем карточку на локалке
        closePopup(deleteCardPopup)                           
    })
    .catch(res => console.log(res)) 
    .finally(buttonDeleteCard.textContent = "Да");
}

//Универсальная локально-серверная функция для установки лайка, как локально так и с отправкой на сервер.
function likeSet(like, likeNum, CardId){
    let PUTorDEL;

    //Ставим лайк локально
    if (like.classList.contains("element__like_set")){              //Если лайк стоит
        like.classList.remove("element__like_set")                  //Убираем его отобржаение
        likeNum.textContent = Number(likeNum.textContent) - 1;      //Уменьшаем общее число на 1
        PUTorDEL = "DELETE"
    }
    else{                                                           //Если не стоит
        like.classList.add("element__like_set")                     //Отображаем, что поставили его
        likeNum.textContent = Number(likeNum.textContent) + 1;      //Увеличиваем общее число на 1
        PUTorDEL = "PUT"
    }

    //Ставим лайк на сервере
    submitLike("cards/likes", PUTorDEL, CardId)
    .then((res) => {                                                //Если всё окей
        likeNum.textContent = res.likes.length;                     //Мы просто подтверждаем это, присвоив полученную длину(по сути она точно такая же как уже стоит)
    })
    .catch(() => {                                                  //Если нет
        like.classList.remove("element__like_set")                  //То удаляем поставленый лайк
        likeNum.textContent = "нет инета";                          //И вместо числа выводим "нет интернета(всё невлезло, поэтому сократил)"
    });
}


//Функция открытия картинки на весь экран
function big_img(image){
    const cardText = image.parentNode.parentNode.querySelector(".element__title").textContent //Можно ещё через alt получать текст, но лучше так

    img.src = image.getAttribute('src');
    img.alt = cardText;
    formImgTitle.textContent = cardText;

    openPopup(formImg);
}

