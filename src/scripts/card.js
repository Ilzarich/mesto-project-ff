const cardTemplate = document.querySelector('#card-template').content;

const createCard = (cardInfo, deleteCard, handleCardLike, onImageClick) => {
    const cardTemplateClone = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardItem = cardTemplateClone.querySelector('.card__image');
    cardItem.src = cardInfo.link;
    cardItem.alt = cardInfo.alt;
    cardTemplateClone.querySelector('.card__title').textContent = cardInfo.name;


    const cardDeleteBtn = cardTemplateClone.querySelector('.card__delete-button');
    cardDeleteBtn.addEventListener('click', () => {
        deleteCard(cardTemplateClone);
    });

    const likeButton = cardTemplateClone.querySelector('.card__like-button');
    likeButton.addEventListener('click', () => {
        handleCardLike(likeButton)
    }); 

    cardItem.addEventListener('click', () => onImageClick(cardInfo.name, cardInfo.link));
    
    return cardTemplateClone;
};

// @todo: Функция удаления карточки
const deleteCard = card => { 
    card.remove();
};

const handleCardLike = likeBtn => {
    likeBtn.classList.toggle('card__like-button_is-active');
}

export {createCard, deleteCard, handleCardLike}