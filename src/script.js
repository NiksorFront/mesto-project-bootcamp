import './pages/index.css';

import {createCard} from "./components/card";
import {openPopup, closePopup} from "./components/modal";
import {request} from "./components/api"
import {avatar, cards, name, job} from "./components/index"
import { error } from 'jquery';


/*Возможно было бы лучше сделать один request и из него получить все данные, 
но по идее такой код лучше, т.к. не сломает всё сразу, если что-то не так, раз мы поотдельности получаем каждую инфу*/

//Получение аватарки с сервера
await request('https://nomoreparties.co/v1/wbf-cohort-14/users/me')
    .then(res => avatar.src = res.avatar)   //res.avatar - это url;     //Устанавливаем серверовскую картинку
    .catch(err => console.log("Упс, ошибка:", err))

//получение имени и рода дейтельности пользователя с сервера
await request('https://nomoreparties.co/v1/wbf-cohort-14/users/me')
    .then((res) => {
        name.textContent = res.name;
        job.textContent = res.about
    })
    .catch(err => console.log("Упс, ошибка:", err))

//получение id пользователя с сервера
export const userId = await request('https://nomoreparties.co/v1/wbf-cohort-14/users/me')
        .then(res => res._id)
        .catch(err => console.log("Упс, кажется что-то рипнулось. Ошибка:", err) )


//card.name - подпись картинки
//card.link - ссылка на неё
//сard.likes.length - количество лайков
//card.likes.map((like) => like._id - Id пользователей, поставивиших лайк
//card.owner._id - Id создателя карточки
//card._id - Id самой карточки

/*Функционал добавления карточек с сервера*/
await request('https://nomoreparties.co/v1/wbf-cohort-14/cards')
    .then((result) => {
        result.forEach(card => cards.append(createCard(card)));   //Добавляем карточку на сайт  
    })
    .catch(err => console.log(err.status))
    

/*Функционал открытия окна редактирования*/
const buttonEdit = document.querySelector(".profile__edit-button");              //кнопочка редактирования профиля
export const profilePopup = document.querySelector("#edit-card");
const buttonPopupCloseEdit = profilePopup.querySelector(".popup__close");

buttonEdit.addEventListener('click', () => openPopup(profilePopup));             //Открываем панель редактирование по клику
buttonPopupCloseEdit.addEventListener('click', () => closePopup(profilePopup));  //И закрывем по клику на крестик


/*Функционал смены аватарки*/
const avatarEdit = document.querySelector(".avatar")
export const avatarPopup = document.querySelector("#edit-img");
const buttonPopupCloseAvatar = avatarPopup.querySelector(".popup__close");

avatarEdit.addEventListener("click", () => openPopup(avatarPopup));
buttonPopupCloseAvatar.addEventListener("click", () => closePopup(avatarPopup));


/*Функционал открытия-закрытия окна создания карточек*/
const buttonAdd = document.querySelector(".button-add");                      //плюсик для открытия окна добаления карточки
export const cardPopup = document.querySelector("#create-card");
const buttonPopupClose_add = cardPopup.querySelector(".popup__close");

buttonAdd.addEventListener('click', () => openPopup(cardPopup));              //Открываем панель созданаия по клику
buttonPopupClose_add.addEventListener('click', () => closePopup(cardPopup));  //И закрывем по клику на крестик


/*Функционал окошка удаления карточки*/
export const deleteCardPopup = document.querySelector("#delete-card");
//export const buttonDeleteCard = deleteCardPopup.querySelector(".form__button-submit");
const buttonPopupClose_delete = deleteCardPopup.querySelector(".popup__close");

buttonPopupClose_delete.addEventListener('click', () => closePopup(deleteCardPopup));      //Закрывем по клику на крестик

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