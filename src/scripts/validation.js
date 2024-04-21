  function showInputError(formElement, inputElement, errorMessage, validationConfig) {//функция показа ошибки
    const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`); //для каждой формы находим класс обознач ошибку
    inputElement.classList.add(validationConfig.inputErrorClass); //присваиваем этот класс инпутам
    errorElement.textContent = errorMessage; //текст из метода inputElement.validationMessage передаем в спан
    errorElement.classList.add(validationConfig.errorClass); //присваиваем этот класс спанам
}
  
  function hideInputError(formElement, inputElement, validationConfig) {
    //функция удаления вывода ошибок
    const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`); //находим спаны по классам
    inputElement.classList.remove(validationConfig.inputErrorClass); //удаляем классы с ошибками для инпута
    errorElement.textContent = ""; //удаляем текст из спанов
    errorElement.classList.remove(validationConfig.errorClass); //удаляем классы с ошибкой из спанов
  }

  function checkInputValidity(formElement, inputElement, validationConfig) {  //функция проверки валидности
    const customErrorMessage = inputElement.dataset.errorMessage; //вытаскиваем кастомное сообщение из инпута
     if (!inputElement.validity.valid) { //если значение не валидно через браузерную проверку то тоже вешаем функцию показа ошибок
      showInputError( formElement, inputElement, inputElement.validationMessage, validationConfig
      );
    } else if (inputElement.validity.valid){
      hideInputError(formElement, inputElement, validationConfig); //если валидно снимаем показ ошибок
    }
  }
  

  const setEventListeners = (formElement, validationConfig) => {  //создаем функцию слушателей событий
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector)); //создаем массив из всех инпутов формы
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector)
    toggleButtonState(inputList, buttonElement, validationConfig)
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => { //по всем инпутам вешаем слушатель на изменение ввода
        checkInputValidity(formElement, inputElement, validationConfig); //запускаем функцию проверки валидности
        toggleButtonState(inputList, buttonElement, validationConfig)
      });
    });
  };

// Функция которая проверяет есть ли невалидные элементы ввода в списке
const hasInvalid = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

  // // Функция которая изменяет состояние кнопки в зависимости от валидности формы 
const toggleButtonState = (inputList, buttonElement, validationConfig) => {
    if(hasInvalid(inputList)) {
        buttonElement.classList.add(validationConfig.inactiveButtonClass); // Если хотя бы одно поле не валидно выключаем кнопку
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(validationConfig.inactiveButtonClass); // Если все поля валидны включаем кнопку 
        buttonElement.disabled = false;
    }
};

  export function enableValidation(validationConfig) {
  const formList = document.querySelectorAll(validationConfig.formSelector); //получаем массив из всех форм на странице Nodelist
  formList.forEach((formElement) => { //перебираем массив с формами и для каждой формы вешаем слушатель на форму
      formElement.addEventListener("submit", function (evt) {
        //вешаем слушатель на элементы
        evt.preventDefault(); //отменяем поведение по умолчанию
      });
      setEventListeners(formElement, validationConfig); //вызываем функцию слушателей событий
    });
  }
  

// // Функция которая убирает все сообщения и сбрасывает состояние кнопки

export const clearValid = (profileForm, validationConfig) => {
    const inputList = Array.from(profileForm.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = profileForm.querySelector(validationConfig.submitButtonSelector);
    inputList.forEach((inputElement) => {
        hideInputError(profileForm, inputElement, validationConfig);//profileForm, inputElement, validationConfig.inputErrorClass, validationConfig.errorClass
    });
    toggleButtonState(inputList, buttonElement, validationConfig.inactiveButtonClass);
}

