import { forAppForm as config } from '../../configs/configForComponents';

import './Form.css';

function Form() {
  const { FORM_TITLE, REDIRECT_TITLE, REDIRECT_BUTTON_TEXT } = config;

  const handleSubmit = (evt) => {
    evt.preventDefault();
  };

  return (
    <form className="form app__form">
      <div className="form__container">
        <h2 className="form__title">{FORM_TITLE}</h2>
        <p className="form__redirect-title">{REDIRECT_TITLE}</p>
        <button type="button" className="form__redirect-button">
          {REDIRECT_BUTTON_TEXT}
        </button>

        <div className="form__inputs">
          <div className="form__field">
            <label className="form__input-label">Имя</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Введите Ваше имя"
              className="form__input form__input_type_input"
            ></input>
            <span className="form__input-error"></span>
          </div>
          <div className="form__field">
            <label className="form__input-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Введите Ваш email"
              className="form__input form__input_type_input"
            ></input>
            <span className="form__input-error"></span>
          </div>
          <div className="form__field">
            <label className="form__input-label">Номер телефона</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Введите номер телефона"
              className="form__input form__input_type_input"
            ></input>
            <span className="form__input-error"></span>
          </div>
          <div className="form__field">
            <label className="form__input-label">Язык</label>
            <select
              id="language-select"
              name="language-select"
              value="Язык"
              className="form__input form__input_type_select"
            >
              <option value="Язык">Язык</option>
              <option value="ru">Русский</option>
              <option value="en">Английский</option>
              <option value="ch">Китайский</option>
              <option value="esp">Испанский</option>
            </select>
          </div>
          <div className="form__field">
            <input
              type="checkbox"
              id="accept"
              name="accept"
              className="form__input form__input_type_checkbox"
            ></input>
            <p className="form__accept-title">
              Принимаю{' '}
              <button type="button" className="form__accept-link">
                условия
              </button>{' '}
              использования
            </p>
          </div>
        </div>
        <button type="submit" onClick={handleSubmit} className="form__submit-button">
          Зарегистрироваться
        </button>
      </div>
    </form>
  );
}

export { Form };
