type fieldValue = string | number;

export interface useFormFieldInterface {
  (initialValue?: fieldValue): {
    value: fieldValue;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setValue: (value: fieldValue) => void;
  };
}
export type FieldProps = {
  label: string;
  name: string;
  data: {
    value: fieldValue;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setValue: (value: fieldValue) => void;
  };
  isRequired?: boolean;
  placeholder?: string;
  value?: string;
};
