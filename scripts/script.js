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
const formSaveNameJob = document.forms.name_jod
profilePopup.querySelector(".form__button-submit");

/*Тут будет функционал отправки новых данных на сервачок*/
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    closePopup(profilePopup)//Закрываем окно

}

formSaveNameJob.addEventListener('submit', handleFormSubmit); 



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
profilePopup.querySelector(".popup__container").addEventListener('click', (event) => {event._isClickWithInModal = true});
profilePopup.addEventListener('click', (event) => {                              //А ещё по клику на тёмный фон
    if (event._isClickWithInModal) return;
    closePopup(profilePopup);
});



/*Функционал открытия-закрытия окна создания карточек*/
const buttonAdd = document.querySelector(".button-add");
const buttonPopupClose_add = cardPopup.querySelector(".popup__close");

buttonAdd.addEventListener('click', () => openPopup(cardPopup));              //Открываем панель созданаия по клику
buttonPopupClose_add.addEventListener('click', () => closePopup(cardPopup));  //И закрывем по клику на крестик
cardPopup.querySelector(".popup__container").addEventListener('click', (event) => {event._isClickWithInModal = true});
cardPopup.addEventListener('click', (event) => {                              //А ещё по клику на тёмный фон
    if (event._isClickWithInModal) return;
    closePopup(cardPopup);
});



//Функция создания каротчки
const sampleCard  = document.querySelector("#card-template").content.querySelector('.element');
function createCard(cardInfo){
    const card = sampleCard.cloneNode(true);
    card.querySelector(".element__title").textContent = cardInfo.name;
    card.querySelector(".element__img").alt = cardInfo.name;
    card.querySelector(".element__img").src = cardInfo.link;
    /*Функционал лайка*/
    card.querySelector(".element__like").addEventListener('click', () => card.querySelector(".element__like").classList.toggle("element__like_set"));
    /*Функционал удаления карточки*/
    card.querySelector(".element__delete").addEventListener('click', () => card.remove());
    /*Функционал открытия большой картинки*/
    card.querySelector("#card-image").addEventListener('click', () => {
        const formImg = document.querySelector('#big-img');
        const Img = formImg.querySelector('.form__img');
        const formImgTitle = formImg.querySelector('.form_img__title');
    
        Img.src = card.querySelector(".element__img").getAttribute('src');
        Img.alt = card.querySelector(".element__img").getAttribute('alt');
        formImgTitle.textContent = card.querySelector(".element__img").getAttribute('alt');

        openPopup(formImg);
    })

    return card
}

/*Функционал Создания карточки*/
const placeNameInput = document.getElementById('name_place');
const linkInput = document.getElementById('link_photo');
const formCreate = document.forms.form_create;

formCreate.addEventListener('submit', (event) => {
    event.preventDefault();
    cards.insertAdjacentElement("afterBegin", createCard({name: placeNameInput.value, link: linkInput.value}))
    closePopup(cardPopup); //Закрываем окно созадния
});

/*Функция валидурющая формы любых размерностей*/
function FormValid(form, InputFields = []){
    Valids = []     //Здесь все значения валидности полей
    InputFields.forEach((inp) => {Valids.push(inp.validity.valid)})    //Узнаём и добвляем в Valids нынешнее состояние полей(валидны, нет ли)
    const SubmitButton = form.querySelector(".form__button-submit");    
    //Функция активрующая или деактивирующая функцию валидации
    function SubmitButtonValid(){
        if(Valids.every(value => value === true)){                      //Если все поля валидны -
            SubmitButton.classList.remove("form__button-submit_block"); //Делаем кнопку
            SubmitButton.disabled = false;                              //активной
        }
        else{                                                           //Если не валидны -
            SubmitButton.classList.add("form__button-submit_block");    //Делаем кнопку 
            SubmitButton.disabled = true;                               //не активной
        };
    }
    //Добавляем каждому полю слушатель проверяющией его на валидность
    InputFields.forEach((inputPlace, index) => {                        
        inputPlace.addEventListener('input', (event)=>{
            Valids[index] = event.target.validity.valid;  //Записваем валидно ли поле сейчас
            if(Valids[index]){ 
                  inputPlace.nextElementSibling.textContent = "";}
            else{ inputPlace.nextElementSibling.textContent = event.target.validationMessage;}
            SubmitButtonValid();      
        })
    })
}

//В списочек добаляем все поля, участвующие в валидации
FormValid(formCreate, [placeNameInput, linkInput]);
FormValid(formSaveNameJob, [nameInput, jobInput]);

/*Функционал добавления-удаления карточек*/
const cards = document.querySelector(".elements");
initialCards.forEach((obj) => cards.insertAdjacentElement("beforeEnd", createCard(obj)));  //Здесь добавляем те карточки, что в начальном списке


/*Функционал закрытия картинки*/
const buttonPopupClose_img = imagePopup.querySelector(".popup__close");
buttonPopupClose_img.addEventListener('click', () => closePopup(imagePopup)); //Закрывем по клику на крестик 
imagePopup.querySelector(".popup__container").addEventListener('click', (event) => {event._isClickWithInModal = true});
imagePopup.addEventListener('click', (event) => {                             //и по клмку на тёмный фон
    if (event._isClickWithInModal) return;
    closePopup(imagePopup);
});

