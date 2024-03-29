//Функция открытия попапа
export function openPopup(popup){
    popup.classList.add("popup_opened");
     //Закрытие по клику на тёмный фон
     popup.addEventListener('click', closeByClick);
     //Закрытие по клику на Escape
     document.addEventListener('keydown', closeByEsc)
}

//Функция закрытия попапа
export function closePopup(popup){
    popup.classList.remove('popup_opened');             //Закрываем окно
    document.removeEventListener('keydown', closeByEsc)
}

function closeByEsc(evt) {
    if (evt.key === "Escape") {
      const openedPopup = document.querySelector('.popup_opened');
      closePopup(openedPopup);
    }
}

function closeByClick(evt){
    if (evt.target.classList.contains("popup")){
        closePopup(evt.target);
    }
}