import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading, onBgClose }) {

  const [nameValue, setNameValue] = useState('');
  const [linkValue, setLinkValue] = useState('');

  useEffect(() => {
    setNameValue('');
    setLinkValue('');
  }, [isOpen]);

  function handleNameChange(evt) {
    setNameValue(evt.target.value);
  }

  function handleLinkChange(evt) {
    setLinkValue(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onAddPlace({
      name: nameValue,
      link: linkValue
    });
  }

  return (
    <PopupWithForm
      name="new-photo"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitButtonText={isLoading ? 'Сохранение...' : 'Сохранить'}
      onBgClose={onBgClose}
    >
      <input
        type="text"
        id="title-input"
        className="popup__input popup__input_type_photo-title"
        placeholder="Название"
        name="photoTitle"
        required minLength="2"
        maxLength="30"
        autoComplete="off"
        onChange={handleNameChange}
        value={nameValue}
      />
      <span className="popup__input-error title-input-error"></span>
      <input
        type="url"
        id="href-input"
        className="popup__input popup__input_type_photo-href"
        placeholder="Ссылка на картинку"
        name="photoHref"
        required
        autoComplete="off"
        onChange={handleLinkChange}
        value={linkValue}
      />
      <span className="popup__input-error href-input-error"></span>
    </PopupWithForm>
  )
}
