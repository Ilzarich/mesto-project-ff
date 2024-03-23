// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import './pages/index.css';
import { initialCards } from './modules/cards.js';

const cardList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;


const deleteCard = card => { card.remove(); };

const createCard = (cardInfo, deleteCardCallback) => {
    const cardTemplateClone = cardTemplate.querySelector('.places__item').cloneNode(true);
    cardTemplateClone.querySelector('.card__image').src = cardInfo.link;
    cardTemplateClone.querySelector('.card__image').alt = cardInfo.alt;
    cardTemplateClone.querySelector('.card__title').textContent = cardInfo.name;
    
    const cardDeleteBtn = cardTemplateClone.querySelector('.card__delete-button');
    cardDeleteBtn.addEventListener('click', () => {
        deleteCardCallback(cardTemplateClone);
    });
    
    return cardTemplateClone;
};

initialCards.forEach(cardInfo => {
    const newCard = createCard(cardInfo, deleteCard);
    cardList.append(newCard);
});