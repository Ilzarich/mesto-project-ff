// функция закрытия поапа через esc
const closeBtnEsc = event => {
    if(event.key === 'Escape') {
        const popupOpen = document.querySelector('.popup_is-opened');
        closeModal (popupOpen);
    }
};

// Открытие попапа 
const openModal = modal => {
    modal.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeBtnEsc);
};
  
// закрытие попапа
const closeModal = modal => {
    modal.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeBtnEsc);
};

export { openModal, closeModal };