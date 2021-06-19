import React from 'react';

import { useFormFieldInterface } from './types';

const useFormField: useFormFieldInterface = (initialValue = '', validators=[]) => {
  const [value, setValue] = React.useState(initialValue);
  const onChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value), []);
  return { value, onChange, setValue };
};

export default useFormField;
