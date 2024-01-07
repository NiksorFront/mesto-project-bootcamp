import {openPopup, closePopup, closePopupByClickOnBackgroundAndButton} from "./popup"

/*Функция открытия картинки на весь экран*/
export function big_img(image, cardText){
    const formImg = document.querySelector('#big-img');
    const img = formImg.querySelector('.form__img');
    const formImgTitle = formImg.querySelector('.form_img__title');
    
    img.src = image.getAttribute('src');
    img.alt = image.getAttribute('alt');
    formImgTitle.textContent = cardText;

    const buttonPopupClose_img = formImg.querySelector(".popup__close");
    buttonPopupClose_img.addEventListener('click', () => closePopup(formImg)); //Закрывем по клику на крестик 
    closePopupByClickOnBackgroundAndButton(formImg);                           //и по клмку на тёмный фон и Escape

    openPopup(formImg);
}