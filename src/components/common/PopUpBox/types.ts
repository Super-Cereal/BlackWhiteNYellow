import { FormEventHandler } from 'react';
import { DeepMap, FieldError, UseFormSetValue, UseFormSetFocus } from 'react-hook-form';

export type formData = {
  commitHash: string;
};

export type popUpBoxContainerProps = {
  popUpAdditionalClass: string;
  togglePopUp: React.MouseEventHandler<HTMLElement>;
};

export type popUpBoxProps = {
  popUpAdditionalClass: string;
  togglePopUp: React.MouseEventHandler<HTMLElement>;
  register: any;
  onSubmit: FormEventHandler<HTMLFormElement>;
  errors: DeepMap<formData, FieldError>;
  setValue: UseFormSetValue<formData>;
  setFocus: UseFormSetFocus<formData>;
  isRequestInProgress: boolean;
};
