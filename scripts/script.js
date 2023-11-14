let initialCards = [
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

/*Функционал имени и рода дейтельности пользователя*/
const Name = document.querySelector(".profile__name");
const NameInput = document.getElementById("name");
NameInput.value = Name.textContent;

const Job = document.querySelector(".profile__subtitle");
const JobInput = document.getElementById("type_of_activity");
JobInput.value = Job.textContent;

const ButtonSave = document.querySelector("#edit-card").querySelector(".form__button-submit");
function saveNew_Name_Job(event){
    event.preventDefault();

    Name.textContent = NameInput.value;
    Job.textContent = JobInput.value;
}

ButtonSave.addEventListener('click', saveNew_Name_Job);

/*Тут будет функционал отправки новых данных на сервачок*/
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    //Функционал сохранения и присвоения реализован в saveNew_Name_Job()
}

ButtonSave.addEventListener('submit', handleFormSubmit); 



/*Функционал открытия-закрытия окна редактирования*/
const ButtonEdit = document.querySelector(".profile__edit-button");
const ButtonPopupClose_edit = document.querySelector("#edit-card").querySelector(".form__close");

ButtonEdit.addEventListener('click', () => document.querySelector("#edit-card").classList.add("popup_opened"));              //Открываем панель редактирование по клику
ButtonPopupClose_edit.addEventListener('click', () => document.querySelector("#edit-card").classList.remove('popup_opened'));//И закрывем по клику



/*Функционал открытия-закрытия окна создания карточек*/
const ButtonAdd = document.querySelector(".button-add");
const ButtonPopupClose_add = document.querySelector("#create-card").querySelector(".form__close");

ButtonAdd.addEventListener('click', () => document.querySelector("#create-card").classList.add("popup_opened"));              //Открываем панель созданаия по клику
ButtonPopupClose_add.addEventListener('click', () => document.querySelector("#create-card").classList.remove('popup_opened'));//И закрывем по клику



/*Функционал Создания карточки*/
const PlaceInput = document.getElementById('name_place');
const LinkInput = document.getElementById('link_photo');
const ButtonCreate = document.querySelector("#create-card").querySelector(".form__button-submit");

ButtonCreate.addEventListener('click', (event) => {
    event.preventDefault();
    initialCards.unshift({name: PlaceInput.value, link: LinkInput.value})
    Card_add(0, 'afterbegin');
    like();     //Рабочий костыль))
    del_but()   //И ещё один не помешает
    opencard(); //Ну и это добивной костыльчек🤘
    document.querySelector("#create-card").classList.remove('popup_opened'); //Закрываем окно созадния
});



/*Функционал добавления-удаления карточек*/
const Cards = document.querySelector(".elements");
const sampleCard  = document.querySelector("#card-template").content.querySelector('.element');


//Функция добавления карточки
function Card_add(index, place='beforeend'){
    const Card = sampleCard.cloneNode(true);
    Card.querySelector(".element__title").textContent = initialCards[index].name;
    Card.querySelector(".element__img").alt = initialCards[index].name;
    Card.querySelector(".element__img").src = initialCards[index].link;
    Cards.insertAdjacentElement(place,Card);
}

initialCards.forEach((obj, index) => Card_add(index));  //Здесь добавляем те карточки, что в начальном списке

function del_but(){ //костыль))
    //Удаление по клику
    const Trash = document.querySelectorAll(".element__delete");
    Trash.forEach((elem, index) => elem.addEventListener('click', () => {
        elem.parentElement.remove()
    }));
}
del_but();

/*Функционал лайка*/
function like(){ //Рабочий костыль))
    const Likes = document.querySelectorAll(".element__like");

    Likes.forEach((element) => element.addEventListener('click', () => {
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
    const CardImg = document.querySelectorAll("#card-image");
    CardImg.forEach((element, index) => element.addEventListener('click', () => {
        const formImg = document.querySelector('#big-img');
        const Img = formImg.querySelector('.form__img');
        const formImgTitle = formImg.querySelector('.form_img__title');
    
        Img.src = element.firstElementChild.getAttribute('src');
        Img.alt = element.firstElementChild.getAttribute('alt');
        formImgTitle.textContent = element.firstElementChild.getAttribute('alt');

        console.log(element.parentElement);
        formImg.classList.add('popup_opened');
    }
    ));
}
opencard();

/*Функционал закрытия картинки*/
const ButtonPopupClose_img = document.querySelector("#big-img").querySelector(".form__close");
ButtonPopupClose_img.addEventListener('click', () => document.querySelector("#big-img").classList.remove('popup_opened'));//Закрывем по клику


