import { forAppForm as config } from '../../configs/configForComponents';
import { useState, useCallback, useEffect } from 'react';
import { useHookWithValidation } from '../../hooks/useFormWithValidation';
import './Form.css';

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
  } = config;

  const { values, handleInputChange, errors, isFormValid, resetForm } = useHookWithValidation();
  const { name, email, phone } = values;

  const [isMouseEntered, setIsMouseEntered] = useState({});
  const [selectedValue, setSelectedValue] = useState('');
  const [isSelectMenuOpen, setIsSelectMenuOpen] = useState(false);
  const [isSelectMenuHidden, setIsSelectMenuHidden] = useState(true);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const closeSelectMenu = useCallback((callback) => {
    setIsSelectMenuOpen(false);
    document.removeEventListener('click', callback);
    setTimeout(() => setIsSelectMenuHidden(true), 300);
  }, []);

  const handleClickAroundForm = useCallback(
    (evt) => {
      if (evt.target.id === 'page') {
        closeSelectMenu(handleClickAroundForm);
      }
    },
    [closeSelectMenu],
  );

  const openSelectMenu = useCallback(() => {
    setIsSelectMenuOpen(true);
    setTimeout(() => setIsSelectMenuHidden(false), 50);
    document.addEventListener('click', handleClickAroundForm);
  }, [handleClickAroundForm]);

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
      const { text } = evt.target;
      setSelectedValue(text);
      closeSelectMenu(handleClickAroundForm);
    },
    [closeSelectMenu, handleClickAroundForm],
  );

  const handleClickAccept = useCallback(
    (evt) => {
      setIsCheckboxChecked(!isCheckboxChecked);
    },
    [isCheckboxChecked],
  );

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
      resetForm();
      setSelectedValue('');
      setIsCheckboxChecked(false);
    },
    [
      handleSubmit,
      name,
      email,
      phone,
      selectedValue,
      isCheckboxChecked,
      resetForm,
      setSelectedValue,
    ],
  );

  useEffect(() => {
    resetForm();
  }, [resetForm]);

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
              required
            ></input>
            <span className={`form__input-error ${!errors.name && 'form__input-error_hidden'}`}>
              {errors.name || '1'}
            </span>
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
            <span className={`form__input-error ${!errors.email && 'form__input-error_hidden'}`}>
              {errors.email || '3'}
            </span>
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
              required
            ></input>
            <span className={`form__input-error ${!errors.phone && 'form__input-error_hidden'}`}>
              {errors.phone || '2'}
            </span>
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
                onBlur={() => selectedValue === LANGUAGE_INPUT_PLACEHOLDER && setSelectedValue('')}
                className="form__input form__input_type_default"
                readOnly
              ></input>
              <div className="form__select-input-button"></div>
            </label>
            <ul
              className={`form__select-input-options ${
                isSelectMenuOpen
                  ? !isSelectMenuHidden
                    ? 'form__select-input-options_appearing'
                    : ''
                  : !isSelectMenuHidden
                  ? 'form__select-input-options_disappearing'
                  : 'form__select-input-options_hidden'
              }`}
            >
              {OPTIONS_LIST.map((option) => (
                <li key={option.value}>
                  <option
                    id={option.value}
                    value={option.value}
                    onMouseMove={handleMouseEnter}
                    onMouseOut={handleMouseLeave}
                    onClick={handleOptionClick}
                    className={`form__select-input-option ${
                      isMouseEntered['Русский'] ? 'form__select-input-option_mouseentered' : ''
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
          disabled={!isFormValid && !selectedValue && isCheckboxChecked}
          className={`form__submit-button ${
            isFormValid && selectedValue && isCheckboxChecked
              ? 'form__submit-button_enabled'
              : 'form__submit-button_disabled'
          }`}
        >
          Зарегистрироваться
        </button>
      </div>
    </form>
  );
}

export { Form };
