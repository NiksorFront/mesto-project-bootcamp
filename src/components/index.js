import {openPopup, closePopup} from "./modal"
import {enableValidation} from "./validation"
import {sending} from "./api"
import {cardPopup, profilePopup, avatarPopup} from "../script"
import {createCard} from "./card"

/*Функционал открытия картинки во весь экран*/
//Подключаем все переменные, нужная для октрытия изображения на весь экран
const formImg = document.querySelector('#big-img');
const img = formImg.querySelector('.form__img');
const formImgTitle = formImg.querySelector('.form_img__title');
const buttonPopupClose_img = formImg.querySelector(".popup__close");
//Функция открытия картинки на весь экран
export function big_img(image, cardText){
    img.src = image.getAttribute('src');
    img.alt = image.getAttribute('alt');
    formImgTitle.textContent = cardText;

    buttonPopupClose_img.addEventListener('click', () => closePopup(formImg)); //Закрывем по клику на крестик

    openPopup(formImg);
}



/*Функционал окна редактирования имени и рода дейтельности*/
export const name = document.querySelector(".profile__name");       //Подгружаем 
const nameInput = document.getElementById("name");                  //имя
nameInput.value = name.textContent;                                 //пользователя

export const job = document.querySelector(".profile__subtitle");    //Подгружаем 
const jobInput = document.getElementById("type_of_activity");       //род
jobInput.value = job.textContent;                                   //дейтельности

const formSaveNameJob = document.forms.name_jod;                    //Кнопка сохранения формы
//В списочек добаляем все поля, участвующие в валидации
enableValidation({
    form: formSaveNameJob,
    inputFields: [nameInput, jobInput],
    submitButtonSelector: ".form__button-submit",
    inactiveButtonClass: "form__button-submit_block"
});

//Функция отправки новых данных на сервачок*
function handleFormSubmit(evt) {
    evt.preventDefault();                                    //Отменяем стандартную отправку формы.
    const submitButton = formSaveNameJob.querySelector(".form__button-submit");  //Находим кнопку отправки
    submitButton.textContent = "Сохранение...";                                    //Для записи ожидающего текста на период сохранения картинки с сервера
    sending("https://nomoreparties.co/v1/wbf-cohort-14/users/me", //Отправляем новое имя и род дейтельности на сервер
            "PATCH",
            {name: nameInput.value, 
             about: jobInput.value})
    .then((res) => {
        name.textContent = res.name;
        job.textContent = res.about
        submitButton.textContent = "Сохранить";  
        closePopup(profilePopup)                             //Закрываем окно
    })
    .catch(err => console.log(err))
}

//По нажатию на "Сохранить" отправляем имя и род дейтельности пользователя
formSaveNameJob.addEventListener('submit', handleFormSubmit); 




/*Функционал редактирования аватарки*/
export const avatar = document.querySelector(".avatar__img");
export const urlInput = document.getElementById("img_url_avatar");
urlInput.value = avatar.src                         //Записываем в строку ввода ссылку

const formSaveUrlAvatar = document.forms.img_url;   //Кнопка сохранения ссылки
enableValidation({                                  //Влючаем валидацию
    form: formSaveUrlAvatar,
    inputFields: [urlInput],
    submitButtonSelector: ".form__button-submit",
    inactiveButtonClass: "form__button-submit_block"
});

//Функция отправки новой аватарки на сервачок
function avatarSubmit(evt) {
    evt.preventDefault();                                    //Отменяем стандартную отправку формы.
    const submitButton = formSaveUrlAvatar.querySelector(".form__button-submit");  //Находим кнопку отправки
    submitButton.textContent = "Сохранение...";                                    //Для записи ожидающего текста на период сохранения картинки с сервера
    sending("https://nomoreparties.co/v1/wbf-cohort-14/users/me/avatar", //Отправляем новое имя и род дейтельности на сервер
            "PATCH",
            {avatar: urlInput.value})
    .then((res) => {
        avatar.src = res.avatar;                             //Устанавливаем серверовскую картинку
        submitButton.textContent = "Сохранить";
        closePopup(avatarPopup)                              //Закрываем окно
    })
    .catch(err => console.log(err))
}

formSaveUrlAvatar.addEventListener('submit', avatarSubmit);




/*Функционал Создания карточки по нажатию*/
export const cards = document.querySelector(".elements"); //Тут храняться все карточки
const placeNameInput = document.getElementById('name_place');
const linkInput = document.getElementById('link_photo');
const formCreate = document.forms.form_create;

formCreate.addEventListener('submit', (event) => {
    event.preventDefault();
    const submitButton = formCreate.querySelector(".form__button-submit");  //Находим кнопку отправки
    submitButton.textContent = "Сохранение...";                                    //Для записи ожидающего текста на период сохранения картинки с сервера
    //Заливаем на сервачок
    sending('https://nomoreparties.co/v1/wbf-cohort-14/cards',
            "POST",
            {name: placeNameInput.value, 
             link: linkInput.value
            })
        .then((resalut)=> {
            cards.prepend(createCard(resalut))      //Добаляем новую карточку в вёрстку
            submitButton.textContent = "Создать";   //Заменяем загрузочную надпись на прежнюю  
            closePopup(cardPopup);                  //Закрываем окно созадния
        })
        .catch(err => console.log(err));

    placeNameInput.value = "";                      //Очищаем поля, чтобы пользователю
    linkInput.value = "";                           //Не пришлось стирать всё самому при создании карточки
});



//В списочек добаляем все поля, участвующие в валидации
enableValidation({
                    form: formCreate,
                    inputFields: [placeNameInput, linkInput],
                    submitButtonSelector: ".form__button-submit",
                    inactiveButtonClass: "form__button-submit_block"
                });