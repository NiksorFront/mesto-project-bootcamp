import {openPopup, closePopup, closePopupByClickOnBackgroundAndButton} from "./popup"
import {enableValidation} from "./validate"
import {big_img} from "./image"


export const cards = document.querySelector(".elements"); //Тут храняться все карточки

//Функция создания каротчки
const sampleCard  = document.querySelector("#card-template").content.querySelector('.element');
export function createCard(cardInfo){
    const card = sampleCard.cloneNode(true);
    const image = card.querySelector(".element__img");
    const like = card.querySelector(".element__like");

    card.querySelector(".element__title").textContent = cardInfo.name;
    image.alt = cardInfo.name;
    image.src = cardInfo.link;

    /*Функционал лайка*/
    like.addEventListener('click', () => like.classList.toggle("element__like_set"));

    /*Функционал удаления карточки*/
    //Можно создать отдельную перменную trash, но т.к. больше нам она не для чего не нужна, то лучше не выдлять память и единорзово её использовать так
    card.querySelector(".element__delete").addEventListener('click', () => card.remove());

    /*Функционал открытия большой картинки*/
    card.querySelector("#card-image").addEventListener('click', () => {big_img(image, cardInfo.name)})

    return card
}


/*Функционал открытия-закрытия окна создания карточек*/
const cardPopup = document.querySelector("#create-card");
const buttonAdd = document.querySelector(".button-add");
const buttonPopupClose_add = cardPopup.querySelector(".popup__close");

buttonAdd.addEventListener('click', () => openPopup(cardPopup));              //Открываем панель созданаия по клику
buttonPopupClose_add.addEventListener('click', () => closePopup(cardPopup));  //И закрывем по клику на крестик
closePopupByClickOnBackgroundAndButton(cardPopup);                            //и по клику на тёмный фон и Escape


/*Функционал Создания карточки по нажатию*/
const placeNameInput = document.getElementById('name_place');
const linkInput = document.getElementById('link_photo');
const formCreate = document.forms.form_create;

formCreate.addEventListener('submit', (event) => {
    event.preventDefault();
    cards.insertAdjacentElement("afterBegin", createCard({name: placeNameInput.value, link: linkInput.value}))
    closePopup(cardPopup); //Закрываем окно созадния
});



//В списочек добаляем все поля, участвующие в валидации
enableValidation(formCreate, [placeNameInput, linkInput]);