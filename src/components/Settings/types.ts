import { FormEventHandler } from 'react';
import { DeepMap, FieldError, UseFormSetFocus, UseFormSetValue } from 'react-hook-form';

export type formData = {
  repoName: string;
  buildCommand: string;
  mainBranch: string;
  period: number;
};

export type settingsFormProps = {
  register: any;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onClickRedirect: any;
  errors: DeepMap<formData, FieldError>;
  setValue: UseFormSetValue<formData>;
  setFocus: UseFormSetFocus<formData>;
  regExps: {
    repoName: RegExp;
    branchName: RegExp;
  };
  isRequestInProgress: boolean;
};
