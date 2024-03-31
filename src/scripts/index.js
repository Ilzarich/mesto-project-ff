// @todo: Темплейт карточки
import '../pages/index.css';
import { initialCards } from './cards.js';
import { openModal, closeModal, setCloseByClickListeners} from './modal.js';
import { createCard, deleteCard, handleCardLike} from './card.js';

// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');

// @todo: Вывести карточки на страницу
initialCards.forEach(cardInfo => {
    const newCard = createCard(cardInfo, deleteCard, handleCardLike, openImageModal);
    cardsContainer.append(newCard);
});

const editModalButton = document.querySelector('.profile__edit-button');
const addModalButton = document.querySelector('.profile__add-button');

const editModal = document.querySelector('.popup_type_edit');
const addModal = document.querySelector('.popup_type_new-card');

// открытие и редактрование профиля пользователя 
const name = document.querySelector('.profile__title');
const subtitle = document.querySelector('.profile__description');

const profileForm = document.forms['edit-profile']; // получание формы 

const inputName = profileForm.elements.name; // input с имененм 
const inputSubtitle = profileForm.elements.description; // input с описанием 

editModalButton.addEventListener('click', () => {
    inputName.value = name.textContent;
    inputSubtitle.value = subtitle.textContent;
    openModal(editModal);
})

function handleProfileEditFormSubmit(event) { // функция изменения данных в щапке 
    event.preventDefault();
  
    name.textContent = inputName.value;
    subtitle.textContent = inputSubtitle.value;
  
    closeModal(editModal);
  }

profileForm.addEventListener('submit', handleProfileEditFormSubmit); 

addModalButton.addEventListener('click', () => { // открытие попапа для профиля 
    openModal(addModal);
  })

const cardForm = document.forms['new-place'];

function handleCardAddFormSubmit(event) { // функция добавления новой карточки 
    event.preventDefault();
    
    const cardName  = cardForm.elements['place-name'].value;
    const cardLink = cardForm.elements.link.value;
  
    const card = createCard({ name: cardName , link: cardLink}, deleteCard, handleCardLike, openImageModal)
    cardsContainer.prepend(card);
  
    cardForm.reset();
  
    // closeModal(addModal);
    closeModal(addModal)
}

cardForm.addEventListener('submit', handleCardAddFormSubmit);

const imageModal = document.querySelector('.popup_type_image');

const modalImage = imageModal.querySelector('.popup__image');
const modalDescription = imageModal.querySelector('.popup__caption');

function openImageModal(name, link) {
  modalImage.src = link;
  modalImage.alt = name;
  modalDescription.textContent = name;
  openModal(imageModal);
}

const popupList = document.querySelectorAll('.popup')

setCloseByClickListeners(popupList)