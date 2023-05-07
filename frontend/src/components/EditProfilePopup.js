import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading, onBgClose }) {

  const currentUser = useContext(UserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser({
      name,
      about: description
    })

  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitButtonText={isLoading ? 'Сохранение...' : 'Сохранить'}
      onBgClose={onBgClose}
    >
      <input
        type="text"
        id="name-input"
        className="popup__input popup__input_type_name"
        placeholder="Имя"
        name="name"
        required
        minLength="2"
        maxLength="40"
        autoComplete="off"
        value={name || ''}
        onChange={handleNameChange}
      />
      <span className="popup__input-error name-input-error"></span>
      <input
        type="text"
        id="about-input"
        className="popup__input popup__input_type_description"
        placeholder="О себе"
        name="about"
        required
        minLength="2"
        maxLength="200"
        autoComplete="off"
        value={description || ''}
        onChange={handleDescriptionChange}
      />
      <span className="popup__input-error about-input-error"></span>
    </PopupWithForm>
  )
}
