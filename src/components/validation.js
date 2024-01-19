/*
setting - это объект, которому нужны следующие ключи-значения \/
    form: форма валидации,
    inputFields: список полей валидации,
    submitButtonSelector: Селектор кнопки отправки,
    inactiveButtonClass: Селектор для дизактивации кнопки отправки"
    //inputErrorClass нет, т.к. тип ошибки опрделяется сам внутри enableValidation
    //errorClass нет, т.к. можно просто присваивать строчке "" и она не будет видна, что и делаю внутри enableValidation
*/
/*Функция валидурющая формы любых размерностей*/ 
export function enableValidation(settings){
    const valids = []     //Здесь все значения валидности полей
    settings.inputFields.forEach((inp) => {valids.push(inp.validity.valid)})    //Узнаём и добвляем в valids нынешнее состояние полей(валидны, нет ли)
    const submitButton = settings.form.querySelector(settings.submitButtonSelector);    
    //Функция активрующая или деактивирующая функцию валидации
    function submitButtonValid(){
        if(valids.every(value => value === true)){                      //Если все поля валидны -
            submitButton.classList.remove(settings.inactiveButtonClass);//Делаем кнопку
            submitButton.disabled = false;                              //активной
        }
        else{                                                           //Если не валидны -
            submitButton.classList.add(settings.inactiveButtonClass);   //Делаем кнопку 
            submitButton.disabled = true;                               //не активной
        };
    }
    //Добавляем каждому полю слушатель проверяющией его на валидность
    settings.inputFields.forEach((inputPlace, index) => {                        
        inputPlace.addEventListener('input', (event)=>{
            valids[index] = event.target.validity.valid;  //Записваем валидно ли поле сейчас
            if(valids[index]){ 
                  inputPlace.nextElementSibling.textContent = "";}
            else{ inputPlace.nextElementSibling.textContent = event.target.validationMessage;}
            submitButtonValid();      
        })
    })
}