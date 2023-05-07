import React, { useEffect } from 'react';
import SignForm from './SignForm';
import { useForm } from '../hooks/useForm';

export default function Register({ handleRegistration }) {

  const { values, handleChange, setValues } = useForm({
    email: '',
    password: '',
  });

  function handleSubmit(evt) {
    evt.preventDefault();

    const clearForm = () => {
      setValues({ email: '', password: '' })
    };

    handleRegistration(values.password, values.email, clearForm);
  }

  return (
    <SignForm
      title={'Регистрация'}
      formType={'sign-up'}
      btnTxt={'Зарегистрироваться'}
      isRegistrationForm={true}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  )
}
