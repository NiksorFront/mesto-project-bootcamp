const initialCards = [
{
    name: 'Пресненский',
    link: './image/image_1.png'
},
{
    name: 'Пресненский',
    link: './image/image_2.png'
},
{
    name: 'Орехово-Борисово северное',
    link: './image/image_3.png',
},
{
    name: 'Алексеевский',
    link: './image/image_4.png',
},
{
    name: 'Хорошёвский',
    link: './image/image_5.png',
},
{
    name: 'Таганский',
    link: './image/image_6.png',
},
];

const profilePopup = document.querySelector("#edit-card");
const cardPopup = document.querySelector("#create-card");
const imagePopup = document.querySelector("#big-img");

//Функция открытия попапа
function openPopup(popup){
    popup.classList.add("popup_opened");
}

//Функция закрытия попапа
function closePopup(popup){
    popup.classList.remove('popup_opened');//Закрываем окно
}

/*Функционал имени и рода дейтельности пользователя*/
const buttonSaveNameJob = profilePopup.querySelector(".form__button-submit");
function saveNew_Name_Job(event){
    event.preventDefault();

    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    closePopup(profilePopup)//Закрываем окно
}

buttonSaveNameJob.addEventListener('click', saveNew_Name_Job);

/*Тут будет функционал отправки новых данных на сервачок*/
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    //Функционал сохранения и присвоения реализован в saveNew_Name_Job()
}

buttonSaveNameJob.addEventListener('submit', handleFormSubmit); 



/*Функционал открытия-закрытия окна редактирования*/
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonPopupClose_edit = profilePopup.querySelector(".popup__close");

const name = document.querySelector(".profile__name"); //Подгружаем 
const nameInput = document.getElementById("name");     //имя
nameInput.value = name.textContent;                    //пользователя

const job = document.querySelector(".profile__subtitle");     //Подгружаем 
const jobInput = document.getElementById("type_of_activity"); //род
jobInput.value = job.textContent;                             //дейтельности

buttonEdit.addEventListener('click', () => openPopup(profilePopup));             //Открываем панель редактирование по клику
buttonPopupClose_edit.addEventListener('click', () => closePopup(profilePopup)); //И закрывем по клику



/*Функционал открытия-закрытия окна создания карточек*/
const buttonAdd = document.querySelector(".button-add");
const buttonPopupClose_add = cardPopup.querySelector(".popup__close");

buttonAdd.addEventListener('click', () => openPopup(cardPopup));              //Открываем панель созданаия по клику
buttonPopupClose_add.addEventListener('click', () => closePopup(cardPopup));//И закрывем по клику



/*Функционал Создания карточки*/
const placeInput = document.getElementById('name_place');
const linkInput = document.getElementById('link_photo');
const buttonCreate = cardPopup.querySelector(".form__button-submit");

buttonCreate.addEventListener('click', (event) => {
    event.preventDefault();
    initialCards.unshift({name: placeInput.value, link: linkInput.value});
    Card_add(0, 'afterbegin');
    like();     //Рабочий костыль))
    del_but()   //И ещё один не помешает
    opencard(); //Ну и это добивной костыльчек🤘
    closePopup(cardPopup); //Закрываем окно созадния
});



/*Функционал добавления-удаления карточек*/
const cards = document.querySelector(".elements");
const sampleCard  = document.querySelector("#card-template").content.querySelector('.element');


//Функция добавления карточки
function Card_add(index, place='beforeend'){
    const card = sampleCard.cloneNode(true);
    card.querySelector(".element__title").textContent = initialCards[index].name;
    card.querySelector(".element__img").alt = initialCards[index].name;
    card.querySelector(".element__img").src = initialCards[index].link;
    cards.insertAdjacentElement(place, card);
}

initialCards.forEach((obj, index) => Card_add(index));  //Здесь добавляем те карточки, что в начальном списке

function del_but(){ //костыль))
    //Удаление по клику
    const trash = document.querySelectorAll(".element__delete");
    trash.forEach((elem, index) => elem.addEventListener('click', () => {
        elem.parentElement.remove()
    }));
}
del_but();

/*Функционал лайка*/
function like(){ //Рабочий костыль))
    const likes = document.querySelectorAll(".element__like");

    likes.forEach((element) => element.addEventListener('click', () => {
        if (element.classList.contains("element__like_set")){
            element.classList.remove("element__like_set");
        }
        else{
            element.classList.add("element__like_set");
        }
    }));
};

like();


/*Функционал открытия картинки*/
function opencard(){ //Костылище
    const cardImg = document.querySelectorAll("#card-image");
    cardImg.forEach((element, index) => element.addEventListener('click', () => {
        const formImg = document.querySelector('#big-img');
        const Img = formImg.querySelector('.form__img');
        const formImgTitle = formImg.querySelector('.form_img__title');
    
        Img.src = element.firstElementChild.getAttribute('src');
        Img.alt = element.firstElementChild.getAttribute('alt');
        formImgTitle.textContent = element.firstElementChild.getAttribute('alt');

        console.log(element.parentElement);
        openPopup(formImg);
    }
    ));
}
opencard();

/*Функционал закрытия картинки*/
const buttonPopupClose_img = imagePopup.querySelector(".popup__close");
buttonPopupClose_img.addEventListener('click', () => closePopup(imagePopup));//Закрывем по клику


