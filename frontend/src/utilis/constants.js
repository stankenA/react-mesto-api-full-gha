export const buttonProfileEdit = document.querySelector('.profile__edit-button');

export const buttonPhotoAdd = document.querySelector('.profile__add-button');

export const avatarEdit = document.querySelector('.profile__picture');

export const buttonsPopupClose = document.querySelectorAll('.popup__close-button');

export const cardTitle = document.querySelector('.popup__input_type_photo-title');
export const cardHref = document.querySelector('.popup__input_type_photo-href');

export const allPopups = document.querySelectorAll('.popup');

export const selectorList = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

export const configApi = {
  url: 'http://api.stankena-mesto.nomoredomains.monster',
  headers: {
    'Content-Type': 'application/json',
    authorization: 'ebcc8864-4ebe-4d94-adc1-0ab4457f09d1'
  }
};
