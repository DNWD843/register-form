import { useState, useCallback } from 'react';

function useHookWithValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isInputValid, setIsInputValid] = useState({});

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

export { useHookWithValidation };
