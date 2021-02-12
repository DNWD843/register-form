import { forAppForm as config } from '../../configs/configForComponents';
import { useState, useCallback, useEffect } from 'react';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Form.css';

/**
 * @module Form
 * @description Компонент формы регистрации
 * @param {Function} handleSubmit - обработчик сабмита формы регистрации
 * @returns {JSX}
 * @since v.1.0.0
 */

function Form({ handleSubmit }) {
  const {
    FORM_TITLE,
    REDIRECT_TITLE,
    REDIRECT_BUTTON_TEXT,
    NAME_INPUT_LABEL,
    NAME_INPUT_PLACEHOLDER,
    EMAIL_INPUT_LABEL,
    EMAIL_INPUT_PLACEHOLDER,
    TEL_INPUT_LABEL,
    TEL_INPUT_PLACEHOLDER,
    LANGUAGE_INPUT_LABEL,
    LANGUAGE_INPUT_PLACEHOLDER,
    OPTIONS_LIST,
    ACCEPT_TITLE_BEGIN,
    ACCEPT_TITLE_END,
    ACCEPT_LINK_TEXT,
    SUBMIT_BUTTON_TEXT,
  } = config;

  const { values, handleInputChange, errors, isFormValid, resetForm } = useFormWithValidation();
  const { name, email, phone } = values;

  const [isMouseEntered, setIsMouseEntered] = useState({});
  const [selectedValue, setSelectedValue] = useState('');
  const [isSelectMenuOpen, setIsSelectMenuOpen] = useState(false);
  const [isSelectMenuHidden, setIsSelectMenuHidden] = useState(true);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const selectInputClassName = classNames('form__select-input-options', {
    'form__select-input-options_appearing': isSelectMenuOpen && !isSelectMenuHidden,
    'form__select-input-options_disappearing': !isSelectMenuOpen && !isSelectMenuHidden,
    'form__select-input-options_hidden': !isSelectMenuOpen && isSelectMenuHidden,
  });

  const nameErrorClassName = classNames('form__input-error', {
    'form__input-error_hidden': !errors.name,
  });

  const emailErrorClassName = classNames('form__input-error', {
    'form__input-error_hidden': !errors.email,
  });

  const phoneErrorClassName = classNames('form__input-error', {
    'form__input-error_hidden': !errors.phone,
  });

  const submitButtonClassName = classNames('form__submit-button', {
    'form__submit-button_enabled': isFormValid && selectedValue && isCheckboxChecked,
    'form__submit-button_disabled': !(isFormValid && selectedValue && isCheckboxChecked),
  });

  /**
   * @method closeSelectMenu
   * @description Метод, закрывающий выпадающий список.
   * @since v.1.0.0
   * @public
   */
  const closeSelectMenu = useCallback(() => {
    setIsSelectMenuOpen(false);
    setTimeout(() => setIsSelectMenuHidden(true), 300);
  }, []);

  /**
   * @method openSelectMenu
   * @description Метод, открывающий выпадающий список
   * @since v.1.0.0
   * @public
   */
  const openSelectMenu = useCallback(() => {
    setIsSelectMenuOpen(true);
    setTimeout(() => setIsSelectMenuHidden(false), 50);
  }, []);

  /**
   * @method handleMouseEnter
   * @description Обработчик попадания курсора мыши в поле опции выпадающего списка.
   *  Выделяет опцию, над которой находится курсор, другим цветом.
   * @param {Event} evt - событие
   * @since v.1.0.0
   * @public
   */
  const handleMouseEnter = useCallback(
    (evt) => {
      const { id } = evt.target;
      setIsMouseEntered({ ...isMouseEntered, [id]: true });
    },
    [isMouseEntered],
  );

  /**
   * @method handleMouseLeave
   * @description Обработчик выхода курсора из поля опции выпадающего списка.
   *  Снимает выделение с опции.
   * @param {Event} evt - событие
   * @since v.1.0.0
   * @public
   */
  const handleMouseLeave = useCallback(
    (evt) => {
      const { id } = evt.target;
      setIsMouseEntered({ ...isMouseEntered, [id]: false });
    },
    [isMouseEntered],
  );

  /**
   * @method handleOptionClick
   * @description Обработчик клика по выбранной опции выпадающего списка.
   * @param {Event} evt - событие
   * @since v.1.0.0
   * @public
   */
  const handleOptionClick = useCallback(
    (evt) => {
      const { text } = evt.target;
      setSelectedValue(text);
      closeSelectMenu();
    },
    [closeSelectMenu],
  );

  /**
   * @method handleClickAccept
   * @description обработчик клика по чекбоксу принятия условий соглашения
   * @param {Event} evt - событие
   * @since v.1.0.0
   * @public
   */
  const handleClickAccept = useCallback(
    (evt) => {
      setIsCheckboxChecked(!isCheckboxChecked);
    },
    [isCheckboxChecked],
  );

  /**
   * @method clearFormInputs
   * @description Метод очистки формы от всех выбранных и введенных значений.
   * @since v.1.0.0
   * @public
   */
  const clearFormInputs = useCallback(() => {
    resetForm();
    setSelectedValue('');
    setIsCheckboxChecked(false);
  }, [resetForm]);

  /**
   * @method handleSubmitForm
   * @description Обработчик сабмита формы
   * @param {Event} evt - событие
   * @since v.1.0.0
   * @public
   */
  const handleSubmitForm = useCallback(
    (evt) => {
      evt.preventDefault();
      const submitData = {
        name,
        email,
        phone,
        language: selectedValue,
        accepted: isCheckboxChecked,
      };
      handleSubmit(submitData);
      clearFormInputs();
    },
    [handleSubmit, name, email, phone, selectedValue, isCheckboxChecked, clearFormInputs],
  );

  useEffect(() => {
    clearFormInputs();
  }, [clearFormInputs]);

  return (
    <form onSubmit={handleSubmitForm} className="form app__form">
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
            <label className="form__input-label">{NAME_INPUT_LABEL}</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name || ''}
              onChange={handleInputChange}
              placeholder={NAME_INPUT_PLACEHOLDER}
              className="form__input form__input_type_default"
              pattern="[a-zA-Zа-яА-Я-s]*"
              required
            ></input>
            <span className={nameErrorClassName}>{errors.name || '1'}</span>
          </div>
          <div className="form__field form__field_type_default">
            <label className="form__input-label">{EMAIL_INPUT_LABEL}</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email || ''}
              onChange={handleInputChange}
              placeholder={EMAIL_INPUT_PLACEHOLDER}
              className="form__input form__input_type_default"
              required
            ></input>
            <span className={emailErrorClassName}>{errors.email || '3'}</span>
          </div>
          <div className="form__field form__field_type_default">
            <label className="form__input-label">{TEL_INPUT_LABEL}</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={phone || ''}
              onChange={handleInputChange}
              placeholder={TEL_INPUT_PLACEHOLDER}
              className="form__input form__input_type_default"
              pattern="[+]?[0-9][\-]?[\(]?\d{3}[\)]?[\-]?\d{3}[\-]?\d{2}[\-]?\d{2}"
              required
            ></input>
            <span className={phoneErrorClassName}>{errors.phone || '2'}</span>
          </div>

          <div className="form__field form__field_type_default form__field_type_select">
            <span className="form__input-label">{LANGUAGE_INPUT_LABEL}</span>
            <label>
              <input
                id="select"
                type="text"
                value={selectedValue || ''}
                placeholder={LANGUAGE_INPUT_PLACEHOLDER}
                onClick={!isSelectMenuOpen ? openSelectMenu : closeSelectMenu}
                onFocus={() => !selectedValue && setSelectedValue(LANGUAGE_INPUT_PLACEHOLDER)}
                onBlur={() => {
                  selectedValue === LANGUAGE_INPUT_PLACEHOLDER && setSelectedValue('');
                  closeSelectMenu();
                }}
                className="form__input form__input_type_default"
                readOnly
              ></input>
              <div className="form__select-input-button"></div>
            </label>
            <ul className={selectInputClassName}>
              {OPTIONS_LIST.map((option) => (
                <li key={option.value}>
                  <option
                    id={option.value}
                    value={option.value}
                    onMouseMove={handleMouseEnter}
                    onMouseOut={handleMouseLeave}
                    onClick={handleOptionClick}
                    className={`form__select-input-option ${
                      isMouseEntered[option.value] ? 'form__select-input-option_mouseentered' : ''
                    }`}
                  >
                    {option.text}
                  </option>
                </li>
              ))}
            </ul>
          </div>

          <div className="form__field form__field_type_checkbox">
            <button
              type="button"
              id="accept"
              name="accept"
              onClick={handleClickAccept}
              className={`form__accept-checkbox ${
                isCheckboxChecked && 'form__accept-checkbox_checked'
              }`}
            ></button>

            <p className="form__accept-title">
              {ACCEPT_TITLE_BEGIN}
              <button type="button" className="form__accept-link">
                {ACCEPT_LINK_TEXT}
              </button>
              {ACCEPT_TITLE_END}
            </p>
          </div>
        </div>
        <button
          type="submit"
          disabled={!isFormValid || !selectedValue || !isCheckboxChecked}
          className={submitButtonClassName}
        >
          {SUBMIT_BUTTON_TEXT}
        </button>
      </div>
    </form>
  );
}

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export { Form };
