import React from 'react';

import { FieldProps } from '../types';

const FormNumberField: React.FC<FieldProps> = ({ label, name, data, value = '' }) => {
  return (
    <div className="Form-InputBlock Form-InputBlock_number">
      <label
        className="Form-InputBlock-Label Form-InputBlock_number-Label Form-InputBlock_number-Label_labelText"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        name={name}
        id={name}
        value={data.value}
        onChange={data.onChange}
        className="Form-InputBlock-Input Form-InputBlock_number-Input"
        max="999"
        type="number"
      />
      <label className="Form-InputBlock-Label Form-InputBlock_number-Label_value" htmlFor={name}>
        {value}
      </label>
    </div>
  );
};

export default FormNumberField;
