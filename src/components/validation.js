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
    toggleButtonState(formElement, inputList, settings);
    inputList.forEach((formInput) => {
      formInput.addEventListener('input', () => {
        isValid(formElement, formInput, settings);
        toggleButtonState(formElement, inputList, settings);
      });
    });
};
  
const hasInvalidInput = (inputList) => {
    return inputList.some((formInput) => {
      return !formInput.validity.valid;
    });
};
  
const toggleButtonState = (formElement, inputList, settings) => {
    const formSubmitButton = formElement.querySelector(settings.submitButtonSelector);
    if (hasInvalidInput(inputList)) {
      formSubmitButton.classList.add(settings.inactiveButtonClass);
      formSubmitButton.disabled = true;
  
    } else {
      formSubmitButton.classList.remove(settings.inactiveButtonClass);
      formSubmitButton.disabled = false;
    }
};
  
export function enableValidation(settings) {
    const forms= Array.from(document.querySelectorAll(settings.formSelector));

    forms.forEach(form => setEventListeners(form, settings));
}