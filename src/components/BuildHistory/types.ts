import { FormEventHandler } from 'react';
import { DeepMap, FieldError } from 'react-hook-form';

import { buildType } from '../BuildDetails/types';

export type formData = {
  commitHash: string;
};

export type buildHistoryProps = {
  repoName: string;
  builds: Array<buildType>;
  isFetching: boolean;
  onShowMore: React.MouseEventHandler<HTMLElement>;
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

export type connectedStoreContainerProps = {
  repoName: string;
};

export type popUpBoxBuildProps = {
  popUpAdditionalClass: string;
  togglePopUp: React.MouseEventHandler<HTMLElement>;
};
