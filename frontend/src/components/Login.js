import React from 'react';
import SignForm from './SignForm';
import { useForm } from '../hooks/useForm';

export default function Login({ handleLogin }) {

  const { values, handleChange, setValues } = useForm({
    email: '',
    password: '',
  });

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!values.password || !values.email) {
      return;
    }
    handleLogin(values.password, values.email);
  }

  return (
    <SignForm
      title={'Вход'}
      formType={'sign-in'}
      btnTxt={'Войти'}
      isRegistrationForm={false}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  )
}
