import {openPopup, closePopup, closePopupByClickOnBackgroundAndButton} from "./popup"
import {enableValidation} from "./validate"

export const cards = document.querySelector(".elements"); //Тут храняться все карточки

//Функция создания каротчки
const sampleCard  = document.querySelector("#card-template").content.querySelector('.element');
export function createCard(cardInfo){
    const card = sampleCard.cloneNode(true);
    card.querySelector(".element__title").textContent = cardInfo.name;
    card.querySelector(".element__img").alt = cardInfo.name;
    card.querySelector(".element__img").src = cardInfo.link;
    /*Функционал лайка*/
    card.querySelector(".element__like").addEventListener('click', () => card.querySelector(".element__like").classList.toggle("element__like_set"));
    /*Функционал удаления карточки*/
    card.querySelector(".element__delete").addEventListener('click', () => card.remove());
    /*Функционал открытия большой картинки*/
    card.querySelector("#card-image").addEventListener('click', () => {
        //Хотя в иделе бы весь этот код перенести в image.js
        const formImg = document.querySelector('#big-img');
        const Img = formImg.querySelector('.form__img');
        const formImgTitle = formImg.querySelector('.form_img__title');
    
        Img.src = card.querySelector(".element__img").getAttribute('src');
        Img.alt = card.querySelector(".element__img").getAttribute('alt');
        formImgTitle.textContent = card.querySelector(".element__img").getAttribute('alt');

        const buttonPopupClose_img = formImg.querySelector(".popup__close");
        buttonPopupClose_img.addEventListener('click', () => closePopup(formImg)); //Закрывем по клику на крестик 
        closePopupByClickOnBackgroundAndButton(formImg);                           //и по клмку на тёмный фон и Escape

        openPopup(formImg);
    })

    return card
}


/*Функционал открытия-закрытия окна создания карточек*/
const cardPopup = document.querySelector("#create-card");
const buttonAdd = document.querySelector(".button-add");
const buttonPopupClose_add = cardPopup.querySelector(".popup__close");

buttonAdd.addEventListener('click', () => openPopup(cardPopup));              //Открываем панель созданаия по клику
buttonPopupClose_add.addEventListener('click', () => closePopup(cardPopup));  //И закрывем по клику на крестик
closePopupByClickOnBackgroundAndButton(cardPopup);                            //и по клмку на тёмный фон и Escape


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