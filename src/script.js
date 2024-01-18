import './pages/index.css';

import {createCard, cards} from "./components/card";
import {openPopup, closePopup, closePopupByClickOnBackgroundAndButton} from "./components/popup";
import {request} from "./components/apiProfile"
import "./components/profile"
import { error } from 'jquery';

/*Функционал добавления карточек с сервера*/
fetch('https://nomoreparties.co/v1/wbf-cohort-14/cards', {
      headers: { authorization: 'dfad8615-a69b-4969-abcf-da90e50e7e80'}
     })
        .then((res) => {
            if (res.ok){ 
                return res.json()
            }
        })
        .then((result) => {
            result.forEach((card) => {
                
                const objCard = {name: card.name,                               //подпись картинки
                                 link: card.link,                               //ссылка на неё
                                 likes: card.likes.length,                      //количество лайков
                                 likeOwner: card.likes.map((like) => like._id), //Id пользователей, поставивиших лайк
                                 idOwner: card.owner._id,                       //Id создателя карточки
                                 cardId: card._id};                             //Id самой карточки
                //console.log(card);
                cards.insertAdjacentElement("beforeEnd", createCard(card))   //Добавляем карточку на сайт
            });
        })
        .catch((err) => console.log(err.status))
       



//Получаем id пользователя
export const userId = await request('https://nomoreparties.co/v1/wbf-cohort-14/users/me')
                            .then(res => res._id)
                            .catch(err => console.log("Упс, кажется что-то рипнулось. Оишбка:", err))


/*Функционал открытия окна редактирования*/
const buttonEdit = document.querySelector(".profile__edit-button");              //кнопочка редактирования профиля
export const profilePopup = document.querySelector("#edit-card");
const buttonPopupCloseEdit = profilePopup.querySelector(".popup__close");

buttonEdit.addEventListener('click', () => openPopup(profilePopup));             //Открываем панель редактирование по клику
buttonPopupCloseEdit.addEventListener('click', () => closePopup(profilePopup));  //И закрывем по клику на крестик
closePopupByClickOnBackgroundAndButton(profilePopup);                            //и по клмку на тёмный фон и Escape


/*Функционал смены аватарки*/
const avatarEdit = document.querySelector(".avatar")
export const avatarPopup = document.querySelector("#edit-img");
const buttonPopupCloseAvatar = avatarPopup.querySelector(".popup__close");

avatarEdit.addEventListener("click", () => openPopup(avatarPopup));
buttonPopupCloseAvatar.addEventListener("click", () => closePopup(avatarPopup));
closePopupByClickOnBackgroundAndButton(avatarPopup);


/*Функционал открытия-закрытия окна создания карточек*/
const buttonAdd = document.querySelector(".button-add");                      //плюсик для открытия окна добаления карточки
export const cardPopup = document.querySelector("#create-card");
const buttonPopupClose_add = cardPopup.querySelector(".popup__close");

buttonAdd.addEventListener('click', () => openPopup(cardPopup));              //Открываем панель созданаия по клику
buttonPopupClose_add.addEventListener('click', () => closePopup(cardPopup));  //И закрывем по клику на крестик
closePopupByClickOnBackgroundAndButton(cardPopup);                            //и по клику на тёмный фон и Escape


/*Функционал окошка удаления карточки*/
export const deleteCardPopup = document.querySelector("#delete-card");
//export const buttonDeleteCard = deleteCardPopup.querySelector(".form__button-submit");
const buttonPopupClose_delete = deleteCardPopup.querySelector(".popup__close");

buttonPopupClose_delete.addEventListener('click', () => closePopup(deleteCardPopup));      //И закрывем по клику на крестик
closePopupByClickOnBackgroundAndButton(deleteCardPopup);                            //и по клику на тёмный фон и Escape


/*
Я не хочу удалять мои карточки, потому что они круче нынешних, серверовских.
Но раз по заданию надо, то пусть хотя бы код будет.
Он всё равно webpack'ом удалиться 
const initialCards = [
{   name: 'Пресненский',
    link: new URL('./image/image_1.png', import.meta.url),
    likes: 0,
},
{   name: 'Пресненский',
    link: new URL('./image/image_2.png', import.meta.url)
},
{   name: 'Орехово-Борисово северное',
    link: new URL('./image/image_3.png', import.meta.url),
},
{   name: 'Алексеевский',
    link: new URL('./image/image_4.png', import.meta.url),
},
{   name: 'Хорошёвский',
    link: new URL('./image/image_5.png', import.meta.url),
},
{   name: 'Таганский',
    link: new URL('./image/image_6.png', import.meta.url),
},
];
Функционал добавления карточек
initialCards.forEach((obj) => cards.insertAdjacentElement("beforeEnd", createCard(obj)));  //Здесь добавляем те карточки, что в списке initialCards
*/