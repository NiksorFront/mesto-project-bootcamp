import './pages/index.css';

import {createCard} from"./components/card";
import {openPopup, closePopup} from "./components/modal";
import {request, sending} from "./components/api"
import {enableValidation} from "./components/validation"
// import {cardPopup, profilePopup, avatarPopup} from "../script"


const cards = document.querySelector(".elements");      //Тут храняться все карточки


const getUserData = request('users/me')
                    .then(res => res)
                    .catch(err => reject(err));

const getCardsServer = request('cards')
                       .then(res => res)
                       .catch(err => reject(err));


Promise.all([getUserData, getCardsServer])
.then((values) => {
    const user = values[0]
    const serverCards = values[1]

    //Получение аватарки с сервера
    avatar.src = user.avatar                             //user.avatar - это url;    
    urlInput.value = avatar.src;                         //Заместо старой, записываем новую ссылку в строку ввода
    name.textContent = user.name;                        //Получение имени
    job.textContent = user.about;                        //и рода дейтельности

    //Добавления карточек на сайт
    serverCards.forEach(card => cards.append(createCard(card, user._id)));
})

/*Функционал окна редактирования имени и рода дейтельности*/
const name = document.querySelector(".profile__name");              
const nameInput = document.getElementById("name");                  
const job = document.querySelector(".profile__subtitle");           
const jobInput = document.getElementById("type_of_activity");                               

const formSaveNameJob = document.forms.name_jod;                    //Кнопка сохранения формы 


/*Функционал открытия окна редактирования*/
const buttonEdit = document.querySelector(".profile__edit-button");              //кнопочка редактирования профиля
const profilePopup = document.querySelector("#edit-card");
const buttonPopupCloseEdit = profilePopup.querySelector(".popup__close");

buttonEdit.addEventListener('click', () => {                                     //Открываем панель редактирование по клику
    nameInput.value = name.textContent;                                          
    jobInput.value = job.textContent;                                            
    openPopup(profilePopup)});             
buttonPopupCloseEdit.addEventListener('click', () => closePopup(profilePopup));  //И закрывем по клику на крестик


//Функция отправки новых данных на сервачок*
function handleFormSubmit(evt) {
    evt.preventDefault();                                         //Отменяем стандартную отправку формы.
    console.log(evt.submitter)
    const submitButton = evt.submitter;                           //Находим кнопку отправки
    submitButton.textContent = "Сохранение...";                   //Для записи ожидающего текста на период сохранения картинки с сервера
    sending("users/me", //Отправляем новое имя и род дейтельности на сервер
            "PATCH",
            {name: nameInput.value, 
             about: jobInput.value})
    .then((res) => {
        name.textContent = res.name;
        job.textContent = res.about
        closePopup(profilePopup)                                  //Закрываем окно
    })
    .catch(err => console.log(err))
    .finally(submitButton.textContent = "Сохранить");
}

//По нажатию на "Сохранить" отправляем имя и род дейтельности пользователя
formSaveNameJob.addEventListener('submit', handleFormSubmit); 



/*Функционал смены аватарки*/
const avatarEdit = document.querySelector(".avatar")
const avatarPopup = document.getElementById("edit-img");
const buttonPopupCloseAvatar = avatarPopup.querySelector(".popup__close");

avatarEdit.addEventListener("click", () => openPopup(avatarPopup));
buttonPopupCloseAvatar.addEventListener("click", () => closePopup(avatarPopup));

/*Функционал онка редактирования аватарки*/
const avatar = document.querySelector(".avatar__img");
const urlInput = document.getElementById("img_url_avatar");
urlInput.value = avatar.src                         //Записываем в строку ввода ссылку

const formSaveUrlAvatar = document.forms.img_url;   //Кнопка сохранения ссылки

//Функция отправки новой аватарки на сервачок
function avatarSubmit(evt) {
    evt.preventDefault();                                    //Отменяем стандартную отправку формы.
    const submitButton = evt.submitter;                      //Находим кнопку отправки
    submitButton.textContent = "Сохранение...";              //Для записи ожидающего текста на период сохранения картинки с сервера
    sending("users/me/avatar", //Отправляем новое имя и род дейтельности на сервер
            "PATCH",
            {avatar: urlInput.value})
    .then((res) => {
        avatar.src = res.avatar;                             //Устанавливаем серверовскую картинку
        closePopup(avatarPopup)                              //Закрываем окно
    })
    .catch(err => console.log(err))
    .finally(submitButton.textContent = "Сохранить");
}

formSaveUrlAvatar.addEventListener('submit', avatarSubmit);




/*Функционал открытия-закрытия окна создания карточек*/
const buttonAdd = document.querySelector(".button-add");                      //плюсик для открытия окна добаления карточки
const cardPopup = document.getElementById("create-card");
const buttonPopupClose_add = cardPopup.querySelector(".popup__close");

buttonAdd.addEventListener('click', () => openPopup(cardPopup));              //Открываем панель созданаия по клику
buttonPopupClose_add.addEventListener('click', () => closePopup(cardPopup));  //И закрывем по клику на крестик

/*Функционал Создания карточки по нажатию*/
const placeNameInput = document.getElementById('name_place');
const linkInput = document.getElementById('link_photo');
const formCreate = document.forms.form_create;

formCreate.addEventListener('submit', (event) => {
    event.preventDefault();
    const submitButton = event.submitter;  //Находим кнопку отправки
    submitButton.textContent = "Создание...";                             //Для записи ожидающего текста на период сохранения картинки с сервера
    //Заливаем на сервачок
    sending('cards',
            "POST",
            {name: placeNameInput.value, 
             link: linkInput.value
            })
        .then((resalut)=> {
            cards.prepend(createCard(resalut))            //Добаляем новую карточку в вёрстку

            closePopup(cardPopup);                        //Закрываем окно созадния
        })
        .catch(err => console.log(err))
        .finally(submitButton.textContent = "Создать");   //Заменяем загрузочную надпись на прежнюю

    placeNameInput.value = "";                      //Очищаем поля, чтобы пользователю
    linkInput.value = "";                           //Не пришлось стирать всё самому при создании карточки
});

//Включаем валидацию форм
enableValidation({
    formSelector: ".form__form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__button-submit",
    inactiveButtonClass: "form__button-submit_block",
    inputErrorClass: "form__error",
    errorClass: "",
});