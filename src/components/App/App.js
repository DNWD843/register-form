import { useCallback } from 'react';
import { Form } from '../Form/Form';
import './App.css';

/**
 * @module App
 * @description Корневой компонент приложения.
 * @since v.1.0.0
 * @returns {JSX}
 */

function App() {
  /**
   * @method handleSubmitRegisterForm
   * @description Обработчик сабмита формы регистрации
   * @param {Object} data - объект с данными формы
   * @property {String} data.name - имя пользователя
   * @property {Strung} data.email - email пользователя
   * @property {String} data.phone - телефон пользователя
   * @property {String} data.language -  выбранный язык
   * @property {Boolean} data.accepted - индикатор принятия пользователем соглашения.
   * @public
   * @since v.1.0.0
   */
  const handleSubmitRegisterForm = useCallback((data) => {
    console.log(data);
  }, []);

  return <Form handleSubmit={handleSubmitRegisterForm} />;
}

export default App;
