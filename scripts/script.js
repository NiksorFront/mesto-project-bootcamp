/*Функционал имени и рода дейтельности пользователя*/
const Name = document.querySelector(".profile__name");
const Name_Input = document.getElementById("name");
Name_Input.value = Name.textContent;

const TypeActivity = document.querySelector(".profile__subtitle");
const TypeActivity_Input = document.getElementById("type_of_activity");
TypeActivity_Input.value = TypeActivity.textContent;

const ButtonSave = document.querySelector(".form__button-submit");
function save(){
    Name.textContent = Name_Input.value;
    TypeActivity.textContent = TypeActivity_Input.value;
}

ButtonSave.addEventListener('click', save);


/*Функционал открытия и закрытия меню*/
const ButtonEdit = document.querySelector(".profile__edit-button");
const ButtonPopupClose = document.querySelector(".form__close");
const Popup = document.querySelector(".popup");
function close_editProfile(){
    Popup.classList.remove('popup_opened');
}
function open_editProfile(){
    Popup.classList.add("popup_opened");
}

ButtonEdit.addEventListener('click', open_editProfile); /*Открываем панель редактирование по клику*/
ButtonPopupClose.addEventListener('click', close_editProfile);/*И закрывем по клику*/


/*Тут будет функционал добавления карточки*/
const Cards = document.querySelector(".elements");

/*Удаление карточки по клику*/
const Trash = document.querySelectorAll(".element__delete");
Trash.forEach((elem) => elem.addEventListener('click', () => elem.parentElement.remove()));

/*Функционал лайка*/
const Likes = document.querySelectorAll(".element__like");

Likes.forEach((element) => element.addEventListener('click', () => {
    console.log(element.classList.contains("element__like_set"));
    if (element.classList.contains("element__like_set")){
        element.classList.remove("element__like_set");
    }
    else{
        element.classList.add("element__like_set");
    }
}));

