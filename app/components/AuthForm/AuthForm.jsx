"use client";
import Styles from './AuthForm.module.css';
import { useState, useEffect } from 'react';
import { endpoints } from '@/app/api/config';
import { isResponseOk } from '@/app/api/api-units';
import { useContext } from "react";
import { useStore } from "@/app/store/app-store";
import { authorize } from '@/app/api/api-units';

export const AuthForm = (props) => {

  const authContext = useStore();
 
  const [authData, setAuthData] = useState({ identifier: "", password: "" });
  const [message, setMessage] = useState({ status: null, text: null });

  const handleInput = (e) => {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = await authorize(endpoints.auth, authData);
    if(isResponseOk(userData)) {
      authContext.login(userData.user, userData.jwt); // login из контекста
      setMessage({ status: "success", text: "Вы авторизовались!" });
    } else {
      setMessage({ status: "error", text: "Неверные почта или пароль" });
    }
  };

  useEffect(() => {
    let timer; 
    if(authContext.user) {
      timer = setTimeout(() => {
        setMessage({ status: null, text: null});
        props.close();
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [authContext.user]); // Данные о user из контекста


  return (
    <form onSubmit={handleSubmit} className={Styles['form']}>
      <h2 className={Styles['form__title']}>Авторизация</h2>
      <div className={Styles['form__fields']}>
        <label className={Styles['form__field']}>
          <span className={Styles['form__field-title']}>Email</span>
          <input
            onInput={handleInput}
            className={Styles["form__field-input"]}
            name="identifier"
            type="email"
            placeholder="hello@world.com"
          />
        </label>
        <label className={Styles['form__field']}>
          <span className={Styles['form__field-title']}>Пароль</span>
          <input
            onInput={handleInput}
            className={Styles['form__field-input']}
            name="password"
            type="password"
            placeholder='***********'
          />
        </label>
      </div>
      <div className={Styles['form__actions']}>
        {message.status && (
          <p className={Styles["form__message"]}>{message.text}</p>
        )}
        <button className={Styles['form__reset']} type="reset">Очистить</button>
        <button className={Styles['form__submit']} type="submit">Войти</button>
      </div>
    </form>
  )
};
export default AuthForm;