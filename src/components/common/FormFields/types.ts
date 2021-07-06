import { FieldError } from 'react-hook-form';

type fieldValue = string | number;

export interface useFormFieldInterface {
  (initialValue?: fieldValue): {
    value: fieldValue;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setValue: (value: fieldValue) => void;
  };
}
export type FieldProps = {
  testid?: string;
  label?: string;
  name: string;
  register: Function;
  validators?: {
    required?: boolean | string;
    pattern?: RegExp | Object;
    min?: Number | Object;
    max?: Number | Object;
  };
  errors?: FieldError | undefined;
  value?: string;
  setValue: Function;
  setFocus: Function;
  placeholder?: string;
};
