//Функция открытия попапа
export function openPopup(popup){
    popup.classList.add("popup_opened");
}

//Функция закрытия попапа
export function closePopup(popup){
    popup.classList.remove('popup_opened');//Закрываем окно
}

//Функция закрытия попапа по нажатия на тёмный фон или escape
export function closePopupByClickOnBackgroundAndButton(popup){
    //Закрытие по клику на тёмный фон
    popup.querySelector(".popup__container").addEventListener('click', (event) => {event._isClickWithInModal = true});
    popup.addEventListener('click', (event) => {                            
        if (event._isClickWithInModal) return;
        popup.classList.remove('popup_opened');
    });

    //Закрытие по клику на Escape
    window.addEventListener('keydown', (event) => {
        if (event.key === "Escape") {
            popup.classList.remove('popup_opened');
        }
    })
}