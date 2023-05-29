import { HIDE_SPINNER, SHOW_SPINNER } from '@constants/redux';

const spinnerReducer = (state = {}, action) => {
  const { type, text } = action;
  switch (type) {
    case SHOW_SPINNER:
      return { ...state, show: true, text };
    case HIDE_SPINNER:
      return {};
    default:
      return state;
  }
};

export default spinnerReducer;
