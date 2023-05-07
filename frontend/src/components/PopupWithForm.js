import React from 'react';

export default function PopupWithForm({ name, title, isOpen, onClose, children, onSubmit, submitButtonText, onBgClose }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} onMouseDown={onBgClose}>
      <div className="popup__container">
        <h3 className="popup__header">{title}</h3>
        <form name={`${name}`} className="popup__form" onSubmit={onSubmit}>
          <fieldset className="popup__form-container">
            {children}
            <button type="submit" className="popup__submit-button">{submitButtonText}</button>
          </fieldset>
        </form>
        <button type="button" className="popup__close-button" aria-label="Кнопка закрытия попапа" onClick={onClose}></button>
      </div>
    </div>
  )
}
