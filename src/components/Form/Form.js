import { forAppForm as config } from '../../configs/configForComponents';
import { useState, useCallback } from 'react';

import './Form.css';

function Form() {
  const { FORM_TITLE, REDIRECT_TITLE, REDIRECT_BUTTON_TEXT } = config;
  const [isOnFocus, setIsOnFocus] = useState(false);
  const [isMouseEntered, setIsMouseEntered] = useState({});
  const [selectValue, setSelectValue] = useState('');
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const handleSubmit = (evt) => {
    evt.preventDefault();
  };

  const handleClickOnAnyPlace = useCallback((evt) => {
    console.log(evt.target);
    if (!evt.target.id || evt.target.id !== 'select') {
      setIsSelectOpen(false);
      document.removeEventListener('click', handleClickOnAnyPlace);
    }
  }, []);

  const handleFocus = useCallback(() => {
    setIsOnFocus(!isOnFocus);
    setIsSelectOpen(true);
    document.addEventListener('click', handleClickOnAnyPlace);
  }, [isOnFocus, handleClickOnAnyPlace]);

  const handleMouseEnter = useCallback(
    (evt) => {
      const { id } = evt.target;
      setIsMouseEntered({ ...isMouseEntered, [id]: true });
    },
    [isMouseEntered],
  );

  const handleMouseLeave = useCallback(
    (evt) => {
      const { id } = evt.target;
      setIsMouseEntered({ ...isMouseEntered, [id]: false });
    },
    [isMouseEntered],
  );

  const handleOptionClick = useCallback(
    (evt) => {
      const { id } = evt.target;
      setIsSelectOpen(false);
      setSelectValue(id);
      document.removeEventListener('click', handleClickOnAnyPlace);
    },
    [handleClickOnAnyPlace],
  );

  return (
    <form className="form app__form">
      <div className="form__container">
        <h2 className="form__title">{FORM_TITLE}</h2>
        <div className="form__description">
          <p className="form__redirect-title">{REDIRECT_TITLE}</p>
          <button type="button" className="form__redirect-button">
            {REDIRECT_BUTTON_TEXT}
          </button>
        </div>
        <div className="form__link form__link_hidden">Здесь какая-то пустая ссылка из макета</div>
        <div className="form__inputs">
          <div className="form__field form__field_type_default">
            <label className="form__input-label">Имя</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Введите Ваше имя"
              className="form__input form__input_type_default"
            ></input>
            <span className="form__input-error">Validation error message</span>
          </div>
          <div className="form__field form__field_type_default">
            <label className="form__input-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Введите Ваш email"
              className="form__input form__input_type_default"
            ></input>
            <span className="form__input-error">Validation error message</span>
          </div>
          <div className="form__field form__field_type_default">
            <label className="form__input-label">Номер телефона</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Введите номер телефона"
              className="form__input form__input_type_default"
            ></input>
            <span className="form__input-error">Validation error message</span>
          </div>

          <div className="form__field form__field_type_default form__field_type_select">
            <span className="form__input-label">Язык</span>
            <label>
              <input
                id="select"
                type="text"
                value={selectValue || ''}
                placeholder="Язык"
                onFocus={handleFocus}
                onBlur={handleFocus}
                className="form__input form__input_type_default"
                readOnly
              ></input>
            </label>
            <ul
              className={`form__select-input-options ${
                isSelectOpen
                  ? 'form__select-input-options_opened'
                  : 'form__select-input-options_hidden'
              }`}
            >
              <li>
                <option
                  id="Русский"
                  value="ru"
                  onMouseMove={handleMouseEnter}
                  onMouseOut={handleMouseLeave}
                  onClick={handleOptionClick}
                  className={`form__select-input-option ${
                    isMouseEntered['Русский'] ? 'form__select-input-option_mouseentered' : ''
                  }`}
                >
                  Русский
                </option>
              </li>
              <li>
                <option
                  id="Английский"
                  value="en"
                  onMouseMove={handleMouseEnter}
                  onMouseOut={handleMouseLeave}
                  onClick={handleOptionClick}
                  className={`form__select-input-option ${
                    isMouseEntered['Английский'] ? 'form__select-input-option_mouseentered' : ''
                  }`}
                >
                  Английский
                </option>
              </li>
              <li>
                <option
                  id="Китайский"
                  value="ch"
                  onMouseMove={handleMouseEnter}
                  onMouseOut={handleMouseLeave}
                  onClick={handleOptionClick}
                  className={`form__select-input-option ${
                    isMouseEntered['Китайский'] ? 'form__select-input-option_mouseentered' : ''
                  }`}
                >
                  Китайский
                </option>
              </li>
              <li>
                <option
                  id="Испанский"
                  value="esp"
                  onMouseMove={handleMouseEnter}
                  onMouseOut={handleMouseLeave}
                  onClick={handleOptionClick}
                  className={`form__select-input-option ${
                    isMouseEntered['Испанский'] ? 'form__select-input-option_mouseentered' : ''
                  }`}
                >
                  Испанский
                </option>
              </li>
            </ul>
          </div>

          <div className="form__field form__field_type_checkbox">
            <label>
              <input
                type="checkbox"
                id="accept"
                name="accept"
                className="form__input-checkbox"
              ></input>
              <div className="form__input form__input_type_checkbox"></div>
            </label>

            <p className="form__accept-title">
              Принимаю{' '}
              <button type="button" className="form__accept-link">
                условия
              </button>{' '}
              использования
            </p>
          </div>
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="form__submit-button form__submit-button_enabled"
        >
          Зарегистрироваться
        </button>
      </div>
    </form>
  );
}

export { Form };
