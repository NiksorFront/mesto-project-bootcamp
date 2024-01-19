//Функция открытия попапа
export function openPopup(popup){
    popup.classList.add("popup_opened");
    closePopupByClickOnBackgroundAndButton(popup); //Закрываем по клику на тёмный фон или Escape
}

//Функция закрытия попапа
export function closePopup(popup){
    popup.classList.remove('popup_opened');//Закрываем окно
    document.removeEventListener('keydown', closeByEsc)
}

//Функция закрытия попапа по нажатия на тёмный фон или escape
function closePopupByClickOnBackgroundAndButton(popup){
    //Закрытие по клику на тёмный фон
    popup.querySelector(".popup__container").addEventListener('click', (event) => {event._isClickWithInModal = true});
    popup.addEventListener('click', (event) => {                            
        if (event._isClickWithInModal) return;
        closePopup(popup);
    });

    //Закрытие по клику на Escape
    document.addEventListener('keydown', closeByEsc)
}

function closeByEsc(evt) {
    if (evt.key === "Escape") {
      const openedPopup = document.querySelector('.popup_opened');
      closePopup(openedPopup);
    }
}