import { HIDE_SPINNER, SHOW_SPINNER } from '@constants/redux';

export const showSpinner = (text = '') => {
  return { type: SHOW_SPINNER, text };
};

export const hideSpinner = () => {
  return { type: HIDE_SPINNER };
};
