import React from 'react';

import { FieldProps } from '../types';

const FormTextField: React.FC<FieldProps> = ({ label, name, data, isRequired = false, placeholder = '' }) => {
  const inputRef = React.createRef<HTMLInputElement>();
  return (
    <div className="Form-InputBlock Form-InputBlock_text">
      <label
        htmlFor={name}
        className={`Form-InputBlock-Label Form-InputBlock_text-Label ${isRequired && 'Form-InputBlock-Label_required'}`}
      >
        {label}
      </label>
      <div className="Form-InputBlock_text-InputBox">
        <input
          className="Form-InputBlock-Input Form-InputBlock_text-Input"
          name={name}
          id={name}
          value={data.value}
          onChange={data.onChange}
          placeholder={placeholder}
          type="text"
          ref={inputRef}
        />
        <span
          className="Form-InputBlock_text-CancelInput"
          onClick={() => {
            data.setValue('');
            inputRef.current?.focus();
          }}
        >
          &#xe90a;
        </span>
      </div>
    </div>
  );
};

export default FormTextField;
