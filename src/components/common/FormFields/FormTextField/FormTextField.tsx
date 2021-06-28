import React from 'react';

import { FieldProps } from '../types';

import '../Form.scss';

const FormTextField: React.FC<FieldProps> = ({
  label,
  name,
  register,
  validators = {},
  errors,
  placeholder = '',
  setValue,
  setFocus,
}) => {
  const onClickHandler = () => {
    setValue(name, '', { shouldValidate: true });
    setFocus(name);
  };
  return (
    <div className="Form-InputBlock Form-InputBlock_text">
      {label && (
        <label
          htmlFor={name}
          className={`Form-InputBlock-Label Form-InputBlock_text-Label ${
            validators.required && 'Form-InputBlock-Label_required'
          }`}
        >
          {label}
        </label>
      )}
      <div className="Form-InputBlock_text-InputBox">
        <input
          className={`Form-InputBlock-Input Form-InputBlock_text-Input ${errors && 'Form-InputBlock-Input_withError'}`}
          id={name}
          {...register(name, validators)}
          placeholder={placeholder}
          type="text"
        />
        <span className="Form-InputBlock_text-CancelInput" onClick={onClickHandler}>
          &#xe90a;
        </span>
      </div>
      {errors && <span className="Form-InputBlock-Error">{errors.message}</span>}
    </div>
  );
};

export default FormTextField;
