import {closePopup, openPopup} from "./modal"
import {big_img} from "./index"
import {userId, deleteCardPopup, buttonDeleteCard} from "../script"
import {submitLikes, deleteCardOnServer} from "./api"

const idCardForDelete = [""] //В нулевой индекс ВСЕГДА надо записывать id той карточки, что надо удалить. А уже потом вызвать deleteCard
//Функция создания каротчки
const sampleCard  = document.querySelector("#card-template").content.querySelector('.element');
export function createCard(cardInfo){
    // console.log(cardInfo);
    const card = sampleCard.cloneNode(true);
    const image = card.querySelector(".element__img");
    const like = card.querySelector(".element__like");
    const trash = card.querySelector(".element__delete");
    const likeNumbers = card.querySelector(".element__number-of-like");

    card.querySelector(".element__title").textContent = cardInfo.name;
    image.alt = cardInfo.name;
    image.src = cardInfo.link;

    card.id = cardInfo._id; //Указываем id, чтобы потом было проще искать карточку при удалении

    /*Функционал лайка*/
    //Я не стал убирать локальную установку, НО придумал и реализовал интеграцию с сервером и его ответом
    likeNumbers.textContent = cardInfo.likes.length
    const likeOwner = cardInfo.likes.map((like) => like._id);                         //Id всех пользователей поставивших лайк.
    if (likeOwner.includes(userId)){                                                  //Проверяем поставлен ли нанешним посителем лайк
        likeNumbers.textContent = likeSet(like, likeNumbers.textContent)              //Если да, то отображем это
    }
    like.addEventListener('click', () => {                                            //Ставим слушатель на иконочку сердечка
        likeNumbers.textContent = likeSet(like, likeNumbers.textContent, cardInfo._id)//чтобы отображать и отпралять инфц о новом лайке
    });   


    /*Функционал удаления карточки*/
    if(cardInfo.owner._id === userId){
        trash.addEventListener('click', () => {
            openPopup(deleteCardPopup)  //Открываем окошко удаления
            //Можно ещё через evt.target.parentElement.id получить Id
            // buttonDeleteCard.addEventListener('click', () => deleteCard(evt.target.parentElement.id))  //Не использовть, т.к. могут удалиться сразу несколько карточек
            //Возможно это не самое изящное решение, но через перемнную не вышло, а лучше я ничего не придумал🙂
            idCardForDelete[0] = card.id //Сохраняем айдшник карточки, чтобы при подтверждении удалить имеено её
        })}
    else{ 
        trash.remove();  //удаляем корзинку с глаз долой из вёрстки вон, т.к. она не наша и удалять чужую картинку мы не в праве.
    }  


    /*Функционал открытия большой картинки*/
    card.querySelector("#card-image").addEventListener('click', () => {big_img(image, cardInfo.name)})

    return card
}

export function deleteCard(){
    buttonDeleteCard.textContent = "Удаление..."                  
    deleteCardOnServer(idCardForDelete[0])                        //Удаляем карточку с сервера
    .then(() => {
        document.getElementById(idCardForDelete[0]).remove()      //Удаляем карточку на локалке
        buttonDeleteCard.textContent = "Да"
        closePopup(deleteCardPopup)                               //Закрывает popup
    })
    .catch(res => console.log(res))
}
/*
export function deleteCard(target){
    console.log(idCardForDelete[0]);
}*/

//Универсальная локально-серверная функция для установки лайка, как локально так и с отправкой на сервер.
function likeSet(like, likeNum, CardId = undefined){
    if (like.classList.contains("element__like_set")){  //Если лайк стоит
        like.classList.remove("element__like_set")      //Убираем его отобржаение
        likeNum = Number(likeNum) - 1;                  //Уменьшаем общее число на 1
    }
    else{                                               //Если не стоит
        like.classList.add("element__like_set")         //Отображаем, что поставили его
        likeNum = Number(likeNum) + 1;                  //Увеличиваем общее число на 1
    }
    //Если CardId задан изначально, значит надо отправить инфу на сервер
    if (CardId !== undefined){
        submitLikes(like, CardId)
        .then((res) => {                                                //Если всё окей
            like.nextElementSibling.textContent = res.likes.length;     //Мы просто подтверждаем это, присвоив полученную длину(по сути она точно такая же как уже стоит)
        })
        .catch((res) => {                                               //Если нет
            like.classList.remove("element__like_set")                  //То удаляем поставленый лайк
            like.nextElementSibling.textContent = "нет инета";          //И вместо числа выводим "нет интернета(всё невлезло, поэтому сократил)"
        });
        return likeNum
    }
    else{
        return likeNum-1 //На один меньше, чтобы не отображолось лайков больше имеющихся
    }
}

