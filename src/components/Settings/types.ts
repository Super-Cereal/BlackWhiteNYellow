import { FormEventHandler } from 'react';
import { DeepMap, FieldError } from 'react-hook-form';

export type FormData = {
  repoName: string;
  buildCommand: string;
  mainBranch: string;
  period: number;
};

export type SettingsFormProps = {
  register: any;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onClickRedirect: any;
  errors: DeepMap<FormData, FieldError>;
  setValue: Function;
  regExps: {
    repoName: RegExp;
    branchName: RegExp;
  };
  isRequestInProgress: boolean;
};
