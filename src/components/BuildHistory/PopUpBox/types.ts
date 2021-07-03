import { FormEventHandler } from 'react';
import { DeepMap, FieldError, UseFormSetValue, UseFormSetFocus } from 'react-hook-form';

export type formData = {
  commitHash: string;
};

export type popUpBoxContainerProps = {
  togglePopUp: React.MouseEventHandler<HTMLElement>;
};

export type popUpBoxProps = {
  togglePopUp: React.MouseEventHandler<HTMLElement>;
  register: any;
  onSubmit: FormEventHandler<HTMLFormElement>;
  errors: DeepMap<formData, FieldError>;
  setValue: UseFormSetValue<formData>;
  setFocus: UseFormSetFocus<formData>;
  isRequestInProgress: boolean;
};

export interface usePopUpTogglerInterface {
  (initialValue: boolean): [boolean, React.MouseEventHandler<HTMLElement>];
}
