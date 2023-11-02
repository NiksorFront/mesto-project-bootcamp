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
const ButtonClose = document.querySelector(".form__close");

const WindowEdit = document.querySelector(".form");
const Background = document.querySelector(".form__background");
function close_editProfile(){
    WindowEdit.setAttribute('style', 'display: none');
    Background.setAttribute('style', 'display: none');
}
function open_editProfile(){
    Name_Input.insertAdjacentHTML('beforeend', '<strong>inserted text</strong>');
    WindowEdit.removeAttribute('style');
    Background.removeAttribute('style');
}

/*По умолчанию панель редактирование отображается сразу, но нам этого не надо*/
close_editProfile(); /*Поэтому скрываем её*/
ButtonEdit.addEventListener('click', open_editProfile); /*Открываем панель редактирование по клику*/
ButtonClose.addEventListener('click', close_editProfile);/*И закрывем по клику*/


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

