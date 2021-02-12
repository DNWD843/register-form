import { useState, useCallback } from 'react';

/**
 * @module useFormWithValidation
 * @description Пользовательский хук.<br>
 * Запускает валидацию формы, с которой используется. Хук выполняет валидацию и вывод ошибок
 *  используя браузерную валидацию, т.е. свойство validity объекта ValidityState.<br>
 * Возвращает объект со стейтами и методами.
 * @returns {Object}  { values, handleInputChange, errors, isFormValid, resetForm }
 * @since v.1.0.0
 * @public
 */
function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isInputValid, setIsInputValid] = useState({});

  /**
   * @method
   * @name handleInputChange
   * @argument {Event} event - событие
   * @description Обработчик изменения полей инпутов.<br> При каждом вводе в поле инпута введенное значение
   *  и результаты валидации введенных значений и формы в целом сохраняются в соответствующие стейты.
   * @public
   * @since v.1.0.0
   */
  const handleInputChange = useCallback(
    (evt) => {
      const { name, value } = evt.target;
      setValues({ ...values, [name]: value });
      setIsInputValid({ ...isInputValid, [name]: evt.target.checkValidity() });
      setErrors({ ...errors, [name]: evt.target.validationMessage });
      setIsFormValid(evt.target.closest('form').checkValidity());
    },
    [values, isInputValid, errors],
  );

  /**
   * @method
   * @name resetForm
   * @description Сброс формы после ввода значений
   * @public
   * @since v.1.0.0
   */
  const resetForm = useCallback(() => {
    setValues({});
    setIsInputValid({});
    setErrors({});
    setIsFormValid(false);
  }, []);

  return {
    values,
    handleInputChange,
    errors,
    isFormValid,
    resetForm,
  };
}

export { useFormWithValidation };
