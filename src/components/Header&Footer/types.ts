export type HeaderProps = {
  titleText: string;
  headerType: 'StartScreen' | 'Settings' | 'BuildHistory' | 'BuildDetails';
  buttons?: JSX.Element;
};
