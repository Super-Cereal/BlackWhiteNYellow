export type withTransparentBackgroundType = (Component: any) => React.FC<any>;

export interface usePopUpTogglerInterface {
  (initialValue: boolean): [
    popUp: boolean,
    togglePopUp: React.MouseEventHandler<HTMLElement>
  ];
}
