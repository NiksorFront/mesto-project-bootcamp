import {openPopup, closePopup, closePopupByClickOnBackgroundAndButton} from "./popup"
import {enableValidation} from "./validate"

/*Функционал открытия-закрытия окна редактирования имени и рода дейтельности*/
const buttonEdit = document.querySelector(".profile__edit-button");
export const profilePopup = document.querySelector("#edit-card");
const buttonPopupCloseEdit = profilePopup.querySelector(".popup__close");

export const name = document.querySelector(".profile__name"); //Подгружаем 
export const nameInput = document.getElementById("name");     //имя
nameInput.value = name.textContent;                           //пользователя

export const job = document.querySelector(".profile__subtitle");    //Подгружаем 
export const jobInput = document.getElementById("type_of_activity");//род
jobInput.value = job.textContent;                                   //дейтельности

buttonEdit.addEventListener('click', () => openPopup(profilePopup));             //Открываем панель редактирование по клику
buttonPopupCloseEdit.addEventListener('click', () => closePopup(profilePopup)); //И закрывем по клику на крестик
closePopupByClickOnBackgroundAndButton(profilePopup);                            //и по клмку на тёмный фон и Escape


export const formSaveNameJob = document.forms.name_jod;
//В списочек добаляем все поля, участвующие в валидации
enableValidation(formSaveNameJob, [nameInput, jobInput]);
