import { FormEventHandler } from 'react';
import { DeepMap, FieldError } from 'react-hook-form';

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
  setValue: Function;
  isRequestInProgress: boolean;
};
