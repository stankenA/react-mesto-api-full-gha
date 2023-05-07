import React, { useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm';


export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading, onBgClose }) {

  const avatarRef = useRef();

  useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value
    })
  }

  return (
    <PopupWithForm
      name="new-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitButtonText={isLoading ? 'Сохранение...' : 'Сохранить'}
      onBgClose={onBgClose}
    >
      <input type="url" id="avatar-href" className="popup__input popup__input_type_new-avatar"
        placeholder="Ссылка на картинку" name="avatarHref" required autoComplete="off" ref={avatarRef} />
      <span className="popup__input-error avatar-href-error"></span>
    </PopupWithForm>
  )
}
