import React, { useContext } from 'react';
import { UserContext } from '../contexts/CurrentUserContext.js';
import Card from './Card.js';

export default function Main({ cards, handleEditAvatarClick, handleEditProfileClick, handleAddPlaceClick, handleCardClick, handleCardLike, handleCardDelete }) {

  const currentUser = useContext(UserContext);

  // Из текущего контекста пользователя достаём необходимую информацию и вставляем на фронт

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__picture-container">
          <img src={currentUser.avatar} alt="Фотография профиля" className="profile__picture" onClick={handleEditAvatarClick} />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button type="button" className="profile__edit-button" aria-label="Кнопка редактирования профиля" onClick={handleEditProfileClick}></button>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button type="button" className="profile__add-button" aria-label="Кнопка добавления фото в галлерею" onClick={handleAddPlaceClick}></button>
      </section>
      <section className="gallery">
        <ul className="gallery__grid">
          {/* Рендерим массив карт */}
          {cards.map((card) => (
            <Card
              card={card}
              key={card._id}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  )
}
