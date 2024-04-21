const cardTemplate = document.querySelector('#card-template').content;

const createCard = (item, deleteCardModal, likeCard, openImageModal, likes, idUser, idCard, userId) => {
    const cardTemplateClone = cardTemplate.querySelector('.places__item').cloneNode(true);

    const cardDeleteBtn = cardTemplateClone.querySelector('.card__delete-button');
    if(idUser !== userId) {
        cardDeleteBtn.classList.add('card__delete-button-disabled');
        cardDeleteBtn.disabled = true;
    }

    cardTemplateClone.querySelector('.card__title').textContent = item.name;
    cardTemplateClone.querySelector('.card_like-count').textContent = likes;
    const cardItem = cardTemplateClone.querySelector('.card__image');
    cardItem.src = item.link;
    cardItem.alt = item.name;

    cardDeleteBtn.addEventListener('click', () => deleteCardModal(idCard, cardTemplateClone));

    const isLike = cardTemplateClone.querySelector('.card__like-button');
    isLike.addEventListener('click', () => likeCard(idCard, cardTemplateClone, isLike));

    cardItem.addEventListener('click', () => openImageModal(item.alt, item.link))

    return cardTemplateClone
}

export {createCard}