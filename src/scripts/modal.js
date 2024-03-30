// функция закрытия поапа через esc
const handleLikeClick = event => {
    if(event.key === 'Escape') {
        const popupOpen = document.querySelector('.popup_is-opened');
        closeModal (popupOpen);
    }
};

function handleCloseModalByOverlay () {
    const closeButton = document.querySelectorAll('.popup__close')
    closeButton.forEach(button => { //нахождение всех Х 
        const perentPopup = button.closest('.popup'); // находим в каком именно модальном окне мы находимся 
        button.addEventListener('click', () => closeModal(perentPopup));  // колбек закрытия попапа 
        perentPopup.addEventListener('mousedown', (event) => { // закрытие попапа на оверлей 
          if  (event.target.classList.contains('popup')) {
            closeModal(perentPopup);
          }
        });
    })
}

// Открытие попапа 
const openModal = modal => {
    modal.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleLikeClick);
};
  
// закрытие попапа
const closeModal = modal => {
    modal.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleLikeClick);
};

export { openModal, closeModal, handleCloseModalByOverlay}; 