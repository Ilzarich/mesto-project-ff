const cardTemplate = document.querySelector('#card-template').content;

const createCard = (item, deleteCardModal, likeCard, openImageModal, likes, idUser, idCard, userId) => {
    const cardTemplateClone = cardTemplate.querySelector('.places__item').cloneNode(true);

    const cardDeleteBtn = cardTemplateClone.querySelector('.card__delete-button');
    if(idUser !== userId) {
        cardDeleteBtn.classList.add('card__delete-button-disabled');
        cardDeleteBtn.disabled = true;
    } else {
        cardDeleteBtn.addEventListener('click', () => deleteCardModal(idCard, cardTemplateClone));
    }

    cardTemplateClone.querySelector('.card__title').textContent = item.name;
    cardTemplateClone.querySelector('.card_like-count').textContent = likes;
    const cardItem = cardTemplateClone.querySelector('.card__image');
    cardItem.src = item.link;
    cardItem.alt = item.name;

    const likeButton = cardTemplateClone.querySelector('.card__like-button');
    likeButton.addEventListener('click', () => likeCard(idCard, cardTemplateClone, likeButton));

    cardItem.addEventListener('click', () => openImageModal(item.alt, item.link))

    return cardTemplateClone
} 

export {createCard}