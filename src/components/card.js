import {closePopup, openPopup} from "./popup"
import {enableValidation} from "./validate"
import {big_img} from "./image"
import {cardPopup, userId, deleteCardPopup} from "../script"
import {likeSubmit, formSubmitCard, deleteCardOnServer} from "./apiCard"


export const cards = document.querySelector(".elements"); //Тут храняться все карточки

//Функция создания каротчки
const sampleCard  = document.querySelector("#card-template").content.querySelector('.element');
export function createCard(cardInfo){
    // console.log(cardInfo);
    const card = sampleCard.cloneNode(true);
    const image = card.querySelector(".element__img");
    const like = card.querySelector(".element__like");
    const trash = card.querySelector(".element__delete");
    const likeNumbers = card.querySelector(".element__number-of-like");

    card.querySelector(".element__title").textContent = cardInfo.name;
    image.alt = cardInfo.name;
    image.src = cardInfo.link;


    /*Функционал лайка(Код сделал более читабельным, но суть такая же)*/
    likeNumbers.textContent = cardInfo.likes.length
    const likeOwner = cardInfo.likes.map((like) => like._id);                       //Id всех пользователей поставивших лайк.
    //console.log(userId)
    if (likeOwner.includes(userId)){                                                          //Проверяем поставлен ли нанешним посителем лайк
        likeNumbers.textContent = likeSet(like, Number(likeNumbers.textContent))              //Если да, то отображем это
    }
    like.addEventListener('click', () => {                                                    //Ставим слушатель на иконочку сердечка
        likeNumbers.textContent = likeSet(like, Number(likeNumbers.textContent), cardInfo._id)//чтобы отображать и отпралять инфц о новом лайке
    });   


    /*Функционал удаления карточки*/
    if(cardInfo.owner._id === userId){
        //deleteCard(cardInfo)
        trash.addEventListener('click', () => {
            openPopup(deleteCardPopup)
            const buttonDeleteCard = deleteCardPopup.querySelector(".form__button-submit");
            buttonDeleteCard.addEventListener('click', () => deleteCard(card, cardInfo))
        })} //Открываем окошко удаления 
    else{ 
        trash.remove();  //удаляем корзинку с глаз долой из вёрстки вон, т.к. она не наша и удалять чужую картинку мы не в праве.
    }  


    // /*Функционал открытия большой картинки*/
    // card.querySelector("#card-image").addEventListener('click', () => {big_img(image, cardInfo.name)})

    return card
}

function deleteCard(crd, crdInf){
    crd.remove()                            //Удаляем карточку на локалке
    deleteCardOnServer(crdInf.cardId)       //Удаляем карточку с сервера
    closePopup(deleteCardPopup)
    //crd.querySelector(".element__delete").removeEventListener()
}

//Универсальная функция для установки лайка, как локально так и с отправкой на сервер.
function likeSet(like, likeNum, CardId = undefined){
    if (like.classList.contains("element__like_set")){  //Если лайк стоит
        like.classList.remove("element__like_set")      //Убирает его отобржаение
        likeNum -= 1;                                   //Уменьшаем общее число на 1
    }
    else{                                               //Если не стоит
        like.classList.add("element__like_set")         //Отображаем, что поставили его
        likeNum += 1;                                   //Увеличиваем общее число на 1
    }
    //Если CardId задан изначально, значит надо отправить инфу на сервер
    if (CardId !== undefined){
        likeSubmit(like, CardId);
        return likeNum
    }
    else{
        return likeNum-1 //На один меньше, чтобы не отображолось лайков больше имеющихся
    }
}

/*Функционал Создания карточки по нажатию*/
const placeNameInput = document.getElementById('name_place');
const linkInput = document.getElementById('link_photo');
const formCreate = document.forms.form_create;

formCreate.addEventListener('submit', (event) => {
    event.preventDefault();
    //Заливаем на сервачок
    formSubmitCard(placeNameInput.value, linkInput.value)
        .then((resalut)=> {
            //Отображаем на локалке, когда получили Idшник
            cards.insertAdjacentElement("afterBegin", createCard({name: placeNameInput.value,   //подпись картинки
                                                                  link: linkInput.value,        //ссылка на неё
                                                                  likes: "0",                   //количество лайков
                                                                  likeOwner: [],                //Id пользователей, поставивиших лайк
                                                                  idOwner: userId,   //Id создателя карточки
                                                                  cardId: "0"}))        //Id самой карточки
        })
        .catch((err) => {console.log(err)})
    closePopup(cardPopup); //Закрываем окно созадния
});



//В списочек добаляем все поля, участвующие в валидации
enableValidation(formCreate, [placeNameInput, linkInput]);