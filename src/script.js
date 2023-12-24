import './pages/index.css';

import {createCard, cards} from "./components/card"
import {closePopup} from "./components/popup"
import {formSaveNameJob, profilePopup, name, nameInput, job, jobInput} from "./components/profile"

const initialCards = [
{   name: 'Пресненский',
    link: new URL('./image/image_1.png', import.meta.url),
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
/*Функционал добавления карточек*/
initialCards.forEach((obj) => cards.insertAdjacentElement("beforeEnd", createCard(obj)));  //Здесь добавляем те карточки, что в списке initialCards


/*Тут будет функционал отправки новых данных на сервачок(Когда он полностью будет написан, то перенесу в одельный js файл*/
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    closePopup(profilePopup)//Закрываем окно

}

/*Функционал имени и рода дейтельности пользователя*/
formSaveNameJob.addEventListener('submit', handleFormSubmit);