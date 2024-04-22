// @todo: Темплейт карточки
import '../pages/index.css';
import { initialCards } from './cards.js';
import { openModal, closeModal, setCloseByClickListeners } from './modal.js';
import { createCard } from './card.js';
import { enableValidation, clearValidation} from './validation.js';
import { getCards, getUser, postCards, postMe, deleteCardApi, putLike, deleteLike, patchUser } from './api.js';

// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');

// @todo: Вывести карточки на страницу

let userId = null;

Promise.all([getUser(), getCards()])
  .then(([userData, cardData]) => {
    console.log(userData);
    console.log(cardData)
    name.textContent = userData.name;
    subtitle.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;
    userId = userData._id;
    cardData.forEach((item) => {
      const newCard = createCard(item, deleteCardModal, likeCard, openImageModal,  item.likes.length, item.owner._id, userId);
      cardsContainer.append(newCard)
    });
    cardData.forEach((item) => {
      if (item.likes.some(like => like._id === userId)) {
        const likeButton = newCard.querySelector('.card__like-button');
        likeButton.classList.add("card__like-button_is-active"); 
      };
    })
  })
  .catch((err) => {
    console.log(err)
  })

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}; 

const editModalButton = document.querySelector('.profile__edit-button');
const addModalButton = document.querySelector('.profile__add-button');

const editModal = document.querySelector('.popup_type_edit');
const addModal = document.querySelector('.popup_type_new-card');

// открытие и редактрование профиля пользователя 
const name = document.querySelector('.profile__title');
const subtitle = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

const profileForm = document.forms['edit-profile']; // получание формы 

const inputName = profileForm.elements.name; // input с имененм 
const inputSubtitle = profileForm.elements.description; // input с описанием 

editModalButton.addEventListener('click', () => {
    inputName.value = name.textContent;
    inputSubtitle.value = subtitle.textContent;
    clearValidation(editModal, validationConfig)
    openModal(editModal);
})

const buttonCheck = document.querySelector('.button')

function handleProfileEditFormSubmit(event) { // функция изменения данных в щапке 
    event.preventDefault();
    buttonCheck.textContent = "Сохранение...";
    postMe(inputName.value, inputSubtitle.value)
    .then((res) => {
      name.textContent = res.value;
      subtitle.textContent = res.value;
      closeModal(editModal);
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      buttonCheck.textContent = 'Сохранить'
    })
  }

profileForm.addEventListener('submit', handleProfileEditFormSubmit); 

addModalButton.addEventListener('click', () => { // открытие попапа для профиля 
    openModal(addModal);
    clearValidation(addModal, validationConfig)
  })

const cardForm = document.forms['new-place'];

function handleCardAddFormSubmit(event) { 
  event.preventDefault();
  buttonCheck.textContent = "Сохранение...";
  postCards(cardForm.elements.placeName.value, cardForm.elements.link.value)
  .then((res) => {
    const cardName = res.elements.placeName.value;
    const cardLink = res.elements.link.value;

    const card = createCard({ name: cardName , link: cardLink}, deleteCardModal, likeCard, openImageModal, res.likes.length, res.owner._id, res._id, userId);
    cardsContainer.prepend(card);
    cardForm.reset();
    closeModal(addModal);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    buttonCheck.textContent = 'Сохранить';
  });
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

const openDel = document.querySelector('.popup_card_delete');
const cardDelFormNew = document.querySelector('.popup__button-delete');

let cardToDelete = null;
let cardToDeleteId = null;

cardDelFormNew.addEventListener('click', () => {
  if (cardToDelete && cardToDeleteId) {
    deleteCardApi(cardToDeleteId)
      .then((res) => {
        console.log(res);
        cardToDelete.remove();
        closeModal(openDel);
        cardToDelete = null;
        cardToDeleteId = null;
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

const deleteCardModal = (cardId, newCard) => {
  openModal(openDel);
  cardToDelete = newCard;
  cardToDeleteId = cardId;
};

const likeCard = (cardId, newCard, isLike) => {
  const likeButton = isLike;
  const likeMethod = likeButton.classList.contains('card__like-button_is-active') ? deleteLike : putLike;
  likeMethod(cardId)
    .then((res) => {
      newCard.querySelector('.card_like-count').textContent = res.likes.length;
      likeButton.classList.toggle("card__like-button_is-active");
    })
    .catch(err => console.log(err));
}



const userAvatar = document.querySelector('.profile__image');
const modalAvatar = document.querySelector('.popup_card_update-avatar');

const formAvatar = document.forms['update-avatar'];
const avatarInput = formAvatar.elements.avatar;

userAvatar.addEventListener('click', () => {
  openModal(modalAvatar);
  avatarInput.value = '';
  clearValidation(modalAvatar, validationConfig);
});

function handFormAvatar(event) {
  event.preventDefault();
  buttonCheck.textContent = 'Сохранение...';
  patchUser(avatarInput.value)
  .then((res) => {
    userAvatar.style.backgroundImage = `url(${res.avatar})`;
    closeModal(modalAvatar)
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    buttonCheck.textContent = 'Сохранить';
  });
}

formAvatar.addEventListener('submit', handFormAvatar)


const popupList = document.querySelectorAll('.popup')

setCloseByClickListeners(popupList)

enableValidation(validationConfig)