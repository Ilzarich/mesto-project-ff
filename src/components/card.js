const cardTemplate = document.querySelector('#card-template').content;

const createCard = (cardInfo, deleteCard, buttonLike, openPopupImage) => {
    const cardTemplateClone = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardItem = cardTemplateClone.querySelector('.card__image');
    cardItem.src = cardInfo.link;
    cardItem.alt = cardInfo.alt;
    cardTemplateClone.querySelector('.card__title').textContent = cardInfo.name;


    const cardDeleteBtn = cardTemplateClone.querySelector('.card__delete-button');
    cardDeleteBtn.addEventListener('click', () => {
        deleteCard(cardTemplateClone);
    });

    const like = cardTemplateClone.querySelector('.card__like-button');
    like.addEventListener('click', () => {
        buttonLike(like)
    }); 

    cardItem.addEventListener('click', () => openPopupImage(cardInfo.name, cardInfo.link));
    
    return cardTemplateClone;
};

// @todo: Функция удаления карточки
const deleteCard = card => { 
    card.remove();
};

const buttonLike = likeBtn => {
    likeBtn.classList.toggle('card__like-button_is-active');
}

const openPopupImage = (name, link) => {}; 

export {createCard, deleteCard, buttonLike, openPopupImage}