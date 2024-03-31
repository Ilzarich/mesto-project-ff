// функция закрытия поапа через esc
const handleCloseModalByEsc= event => {
    if(event.key === 'Escape') {
        const popupOpen = document.querySelector('.popup_is-opened');
        closeModal (popupOpen);
    }
};

function setCloseByClickListeners (modals) {
    modals.forEach(modal => {
        // находим кнопку
        const closeButton = modal.querySelector('.popup__close')
        // Вешаем обработчик закрытия на кнопку
        closeButton.addEventListener('click', () => {
            modal.classList.remove('popup_is-opened');
        })

        // Вешаем обработчик закрытия на оверлей
        modal.addEventListener('mousedown', (event) => {
            if(event.target.classList.contains('popup')) {
                closeModal(modal)
            }
        })

    })
};

// Открытие попапа 
const openModal = modal => {
    modal.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleCloseModalByEsc);
};
  
// закрытие попапа
const closeModal = modal => {
    modal.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleCloseModalByEsc);
};

export { openModal, closeModal, setCloseByClickListeners}; 