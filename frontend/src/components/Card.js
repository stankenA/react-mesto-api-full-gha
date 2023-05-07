import React, { useContext } from 'react';
import { UserContext } from '../contexts/CurrentUserContext.js';

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = useContext(UserContext);

  //Проверка, является ли пользователь владельцем карточки и поставил ли он ей лайк
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((item) => {
    return item._id === currentUser._id;
  });

  const cardLikeButtonClassName = (
    `gallery__like-button ${isLiked && 'gallery__like-button_active'}`
  );

  function handleClick() {
    onCardClick(card);
  }

  function handleLike() {
    onCardLike(card);
  }

  function handleDelete() {
    onCardDelete(card)
  }

  return (
    <li className="gallery__card">
      <img className="gallery__picture" src={card.link} onClick={handleClick} alt={card.name} />
      <div className="gallery__card-container">
        <h2 className="gallery__caption">{card.name}</h2>
        <div className="gallery__like-container">
          <button type="button" className={cardLikeButtonClassName} aria-label="Кнопка лайка" onClick={handleLike}></button>
          <span className="gallery__like-counter">{card.likes.length}</span>
        </div>
        {/* Оставляем кнопку удаления только у своих карт */}
        {isOwn && <button className="gallery__delete-button" onClick={handleDelete}></button>}
      </div>
    </li>
  )
}
