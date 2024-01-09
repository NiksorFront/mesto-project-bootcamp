import {enableValidation} from "./validate";
import {closePopup} from "./popup";
import {profilePopup, avatarPopup} from "../script"
import {SubmitNameJob, SubmitAvatar} from "./apiProfile"

/*Функционал окна редактирования имени и рода дейтельности*/
export const name = document.querySelector(".profile__name");       //Подгружаем 
const nameInput = document.getElementById("name");                  //имя
nameInput.value = name.textContent;                                 //пользователя

export const job = document.querySelector(".profile__subtitle");    //Подгружаем 
const jobInput = document.getElementById("type_of_activity");       //род
jobInput.value = job.textContent;                                   //дейтельности


const formSaveNameJob = document.forms.name_jod;                    //Кнопка сохранения формы
//В списочек добаляем все поля, участвующие в валидации
enableValidation(formSaveNameJob, [nameInput, jobInput]);


/*Функционал отправки новых данных на сервачок*/
function handleFormSubmit(evt) {
    evt.preventDefault();                           //Отменяем стандартную отправку формы.
    SubmitNameJob(nameInput.value, jobInput.value)  //Отправляем новое имя и род дейтельности на сервер
    closePopup(profilePopup)                        //Закрываем окно
}

//По нажатию на "Сохранить" отправляем имя и род дейтельности пользователя
formSaveNameJob.addEventListener('submit', handleFormSubmit);


/*Функционал редактирования аватарки*/
export const urlInput = document.getElementById("img_url_avatar");

const formSaveUrlAvatar = document.forms.img_url;   //Кнопка сохранения ссылки
enableValidation(formSaveUrlAvatar, [urlInput]);    //Влючаем валидацию
formSaveUrlAvatar.addEventListener('submit', (evt) => {
    evt.preventDefault();
    SubmitAvatar(urlInput.value);
    closePopup(avatarPopup);
});
