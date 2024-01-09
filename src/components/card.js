import {closePopup, openPopup} from "./popup"
import {enableValidation} from "./validate"
import {big_img} from "./image"
import {cardPopup, userId, deleteCardPopup} from "../script"
import {likeSubmit, formSubmitCard, deleteCardOnServer} from "./apiCard"


export const cards = document.querySelector(".elements"); //Тут храняться все карточки

//Функция создания каротчки
const sampleCard  = document.querySelector("#card-template").content.querySelector('.element');
export function createCard(cardInfo){
    const card = sampleCard.cloneNode(true);
    const image = card.querySelector(".element__img");
    const like = card.querySelector(".element__like");
    const trash = card.querySelector(".element__delete");
    const likeNumbers = card.querySelector(".element__number-of-like");

    card.querySelector(".element__title").textContent = cardInfo.name;
    image.alt = cardInfo.name;
    image.src = cardInfo.link;


    /*Функционал лайка*/
    likeNumbers.textContent = cardInfo.likes;             //Записываем сколько уже поставлено
    if (cardInfo.likeOwner.includes(userId)){             //Проверяем поставлен ли нанешним посителем лайк
        likeNumbers.textContent -= 1;  //(мини костыль, нужный, чтобы не отображолось лайков больше имеюшихся. Ведь в likeSet мы прибаляем к likeNumbers.textContent этот 1 при отображении)         
        likeSet(like, likeNumbers)                        //Если да, то отображем это
    }
    like.addEventListener('click', () => {                //Ставим слушатель на иконочку сердечка
        likeSet(like, likeNumbers)                        //чтобы пользователь мог локально поставить свой лайк
        likeSubmit(like, cardInfo.cardId);                //и отправить инфу на сервер, что он ставлен(или убран)
    });   


    /*Функционал удаления карточки*/
    if(cardInfo.idOwner == userId){
        //deleteCard(cardInfo)
        trash.addEventListener('click', () => {
            openPopup(deleteCardPopup)
            const buttonDeleteCard = deleteCardPopup.querySelector(".form__button-submit");
            buttonDeleteCard.addEventListener('click', () => deleteCard(card, cardInfo))
        })} //Открываем окошко удаления 
    else{ 
        trash.style.display = 'none';  //убираем корзинку с глаз долой из вёрстки вон, т.к. она не наша и удалять чужую картинку мы не в праве.
    }  


    /*Функционал открытия большой картинки*/
    card.querySelector("#card-image").addEventListener('click', () => {big_img(image, cardInfo.name)})

    return card
}

function deleteCard(crd, crdInf){
    crd.remove()                            //Удаляем карточку на локалке
    deleteCardOnServer(crdInf.cardId)       //Удаляем карточку с сервера
    closePopup(deleteCardPopup)
    //crd.querySelector(".element__delete").removeEventListener()
}

function likeSet(like, likeNum){
    if (like.classList.contains("element__like_set")){
        like.classList.remove("element__like_set")
        likeNum.textContent = Number(likeNum.textContent) - 1; 
    }
    else{
        like.classList.add("element__like_set")
        likeNum.textContent = Number(likeNum.textContent) + 1; 
    }
}

/*Функционал Создания карточки по нажатию*/
const placeNameInput = document.getElementById('name_place');
const linkInput = document.getElementById('link_photo');
const formCreate = document.forms.form_create;

formCreate.addEventListener('submit', (event) => {
    event.preventDefault();
    //Заливаем на сервачок
    formSubmitCard(placeNameInput.value, linkInput.value)
        .then((resalut)=> {
            //Отображаем на локалке, когда получили Idшник
            cards.insertAdjacentElement("afterBegin", createCard({name: placeNameInput.value,   //подпись картинки
                                                                  link: linkInput.value,        //ссылка на неё
                                                                  likes: "0",                   //количество лайков
                                                                  likeOwner: [],                //Id пользователей, поставивиших лайк
                                                                  idOwner: userId,   //Id создателя карточки
                                                                  cardId: "0"}))        //Id самой карточки
        })
        .catch((err) => {console.log(err)})
    closePopup(cardPopup); //Закрываем окно созадния
});



//В списочек добаляем все поля, участвующие в валидации
enableValidation(formCreate, [placeNameInput, linkInput]);