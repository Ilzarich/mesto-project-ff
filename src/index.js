// @todo: Темплейт карточки
import './pages/index.css';
import { initialCards } from './components/cards.js';
import { openModal, closeModal } from './components/modal.js';
import { createCard, deleteCard, buttonLike } from './components/card.js';

// @todo: DOM узлы
const cardList = document.querySelector('.places__list');

// @todo: Вывести карточки на страницу
initialCards.forEach(cardInfo => {
    const newCard = createCard(cardInfo, deleteCard, buttonLike, openImageModal);
    cardList.append(newCard);
});

const editModalButton = document.querySelector('.profile__edit-button');
const addModalButton = document.querySelector('.profile__add-button');

const editModal = document.querySelector('.popup_type_edit');
const addModal = document.querySelector('.popup_type_new-card');

const closePopup = document.querySelectorAll('.popup__close');

//нахождение всех Х 
closePopup.forEach(button => {
    const perentPopup = button.closest('.popup'); // находим в каком именно модальном окне мы находимся 
    button.addEventListener('click', () => closeModal(perentPopup));  // колбек закрытия попапа 
    perentPopup.addEventListener('mousedown', (event) => { // закрытие попапа на оверлей 
      if  (event.target.classList.contains('popup')) {
        closeModal(perentPopup);
      }
    });
  })

// открытие и редактрование профиля пользователя 
const name = document.querySelector('.profile__title');
const subtitle = document.querySelector('.profile__description');

const elementProfile = document.forms['edit-profile']; // получание формы 

const inputName = elementProfile.elements.name; // input с имененм 
const inputSubtitle = elementProfile.elements.description; // input с описанием 

editModalButton.addEventListener('click', () => {
    inputName.value = name.textContent;
    inputSubtitle.value = subtitle.textContent;
    openModal(editModal);
})

function handleFormSubmit(event) {
    event.preventDefault();
  
    name.textContent = inputName.value;
    subtitle.textContent = inputSubtitle.value;
  
    closeModal(editModal);
  }

elementProfile.addEventListener('submit', handleFormSubmit); 

addModalButton.addEventListener('click', () => { // открытие попапа для профиля 
    openModal(addModal);
  })

const elementCard = document.forms['new-place'];

function handleFormSubmitCard(event) {
    event.preventDefault();
    
    const nameCardInput = elementCard.elements['place-name'].value;
    const linkCardInput  = elementCard.elements.link.value;
  
    const card = createCard({ name: nameCardInput, link: linkCardInput }, deleteCard, buttonLike, openImageModal)
    cardList.prepend(card);
  
    elementCard.reset();
  
    closeModal(addModal);
}

elementCard.addEventListener('submit', handleFormSubmitCard);

const imageModal = document.querySelector('.popup_type_image');

const modalImage = imageModal.querySelector('.popup__image');
const modalDescription = imageModal.querySelector('.popup__caption');

function openImageModal(name, link) {
  modalImage.src = link;
  modalImage.alt = name;
  modalDescription.textContent = name;
  openModal(imageModal);
}