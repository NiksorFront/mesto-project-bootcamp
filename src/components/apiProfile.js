import {name, job, urlInput} from "./profile"


/*Функционал получения имя пользователя с сервера*/
fetch('https://nomoreparties.co/v1/wbf-cohort-14/users/me', {
       headers: {
            authorization: 'dfad8615-a69b-4969-abcf-da90e50e7e80'}
    })
    .then((res) => {
       if (res.ok) {  return res.json()  }
    })
    .then((res) => {
        name.textContent = res.name;
        job.textContent = res.about
    })
    .catch((err) => {console.log(err)})

/*Функционал получения картинки с сервера*/
/*fetch('https://nomoreparties.co/v1/wbf-cohort-14/users/me/avatar', {
        method: 'PATCH',
        headers: {
            authorization: 'dfad8615-a69b-4969-abcf-da90e50e7e80',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: "https://downloader.disk.yandex.ru/preview/bbbf52c789a8403c5a594d9a44ae512a72b985b044281a8661b3a61afac6eca7/659c7e7b/9lnd5R6Nrwpy_h392Qk5lwc7A2C2B4uQwZIfDsGp9U4wMnv_qUPeGj1L3rlOHJ9ioa21WvQJvGaQNrwBrhE5Ug%3D%3D?uid=0&filename=niksor.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v2&size=2048x2048"
        })
    })
    .then((res) => res.json())
    .then((res) => {
        console.log(res);
     })*/

/*Функционал получения картинки с сервера*/
fetch('https://nomoreparties.co/v1/wbf-cohort-14/users/me', {
      headers: { authorization: 'dfad8615-a69b-4969-abcf-da90e50e7e80'}
    })
    .then((res) => {
        if (res.ok) {  return res.json()  }
    })
    .then((res) => {
        const URL = res.avatar;
        document.querySelector(".avatar__img").src = URL; //Устанавливаем серверовскую картинку
        urlInput.value = URL;                             //Записываем в строку ввода ссылку
     })
     .catch((err) => {console.log(err)})

/*Функционал отправки ссылки на новую картинку на сервачок*/
export function SubmitAvatar(url){
    fetch('https://nomoreparties.co/v1/wbf-cohort-14/users/me/avatar', {
        method: 'PATCH',
        headers: {
            authorization: 'dfad8615-a69b-4969-abcf-da90e50e7e80',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: url 
        })
    })
    .then((res) => {
        if (res.ok) {  return res.json()  }
    })
    .then((res) => {
        document.querySelector(".avatar__img").src = res.avatar; //Устанавливаем серверовскую картинку
    })
    .catch((err) => {console.log(err)})
}


    

/*Функционал отправки новых данных на сервачок*/
export function SubmitNameJob(newName, newJob) {
    fetch("https://nomoreparties.co/v1/wbf-cohort-14/users/me", {
        method: 'PATCH',
        headers: {
            authorization: 'dfad8615-a69b-4969-abcf-da90e50e7e80',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: newName,
            about: newJob,
        })
    })
    .then((res) => {
        if (res.ok){ 
            return res.json()
        }
    })
    .then((res) => {
        name.textContent = res.name;
        job.textContent = res.about
    })
    .catch((err) => {console.log(err)})
}