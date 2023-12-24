/*Функция валидурющая формы любых размерностей*/
export function enableValidation(form, InputFields = []){
    const Valids = []     //Здесь все значения валидности полей
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