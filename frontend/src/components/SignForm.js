import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SignForm({ title, formType, btnTxt, isRegistrationForm, handleChange, handleSubmit }) {

  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  function handleEmailChange(evt) {
    setEmailValue(evt.target.value);
    handleChange(evt);
  }

  function handlePasswordChange(evt) {
    setPasswordValue(evt.target.value);
    handleChange(evt);
  }

  return (
    <div className="sign">
      <h1 className="sign__title">{title}</h1>
      <form name={`${formType}-form`} className="sign__form" onSubmit={handleSubmit}>
        <fieldset className="sign__fieldset">
          <input
            type="email"
            name="email"
            id={`${formType}-mail`}
            className="sign__input"
            required
            placeholder="Email"
            onChange={handleEmailChange}
            value={emailValue}
          />
          <input
            type="password"
            name="password"
            id={`${formType}-password`}
            required
            className="sign__input"
            placeholder="Пароль"
            onChange={handlePasswordChange}
            value={passwordValue}
          />
        </fieldset>
        <button type="submit" className="sign__submit">{btnTxt}</button>
      </form>
      {isRegistrationForm && <Link to="/sign-in" className="sign__link">Уже зарегистрированы? Войти</Link>}
    </div>
  )
}
