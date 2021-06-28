import { axiosGetSettings } from '../../components/Settings/redux/settingsActions';

export const INITIALIZE_APP_SUCCESS = 'INITIALIZE_APP_SUCCESS';

export const initializeApp = () => async (dispatch) => {
  await dispatch(axiosGetSettings());
  dispatch(INITIALIZE_APP_SUCCESS);
};
