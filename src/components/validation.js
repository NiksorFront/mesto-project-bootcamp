/*
setting - это объект, которому нужны следующие ключи-значения \/
    form: форма валидации,
    inputFields: список полей валидации,
    submitButtonSelector: Селектор кнопки отправки,
    inactiveButtonClass: Селектор для дизактивации кнопки отправки"
    inputErrorClass: тип ошибки опрделяется
    errorClass:
*/

const showInputError = (formElement, formInput, settings) => {
    const inputError = formElement.querySelector(`#${formInput.id}-error`);
    inputError.textContent = formInput.validationMessage;
  };
  
const hideInputError = (formElement, formInput, settings) => {
    const inputError = formElement.querySelector(`#${formInput.id}-error`);
    inputError.textContent = '';
};
  
const isValid = (formElement, formInput, settings) => {
    if (!formInput.validity.valid) {
      showInputError(formElement, formInput, settings);
    } else {
      hideInputError(formElement, formInput, settings);
    }
};
  
const setEventListeners = (formElement, settings) => {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const formSubmitButton = formElement.querySelector(settings.submitButtonSelector);
    toggleButtonState(formElement, formSubmitButton, settings);
    inputList.forEach((formInput) => {
      formInput.addEventListener('input', () => {
        isValid(formElement, formInput, settings);
        toggleButtonState(formElement, formSubmitButton, settings);
      });
    });

    /*formElement.addEventListener("submit", () => {
      disabledButton(formSubmitButton, settings)
    });*/
};

export function disabledSubmitButton(formSubmitButton, settings){
  formSubmitButton.classList.add(settings.inactiveButtonClass);
  formSubmitButton.disabled = true;
}

export function enableSubmitButton(formSubmitButton, settings){
  formSubmitButton.classList.remove(settings.inactiveButtonClass);
  formSubmitButton.disabled = false;
}

const toggleButtonState = (formElement, formSubmitButton, settings) => {
    !formElement.checkValidity() 
    ? disabledSubmitButton(formSubmitButton, settings)
    : enableSubmitButton(formSubmitButton, settings);
};
  
export function enableValidation(settings) {
    const forms= document.querySelectorAll(settings.formSelector);
    forms.forEach(form => setEventListeners(form, settings));
}