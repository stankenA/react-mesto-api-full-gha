import React from 'react'

export default function ImagePopup({ card, onClose, onBgClose }) {
  return (
    <div className={`popup popup_dark popup_type_fz-photo ${card._id ? 'popup_opened' : ''}`} onClick={onBgClose}>
      <div className="popup__photo-container">
        <img src={card.link} className="popup__image" alt={card.name} />
        <p className="popup__caption">{card.name}</p>
        <button type="button" className="popup__close-button" aria-label="Кнопка закрытия попапа" onClick={onClose}></button>
      </div>
    </div>
  )
}
