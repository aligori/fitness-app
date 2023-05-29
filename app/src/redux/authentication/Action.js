import { ADD_AUTH, REMOVE_AUTH } from '@constants/redux';
import { addMe, removeMe } from '@redux/me/Action';

export const addAuth = (payload) => {
  return {
    type: ADD_AUTH,
    payload
  };
};

export const removeAuth = () => {
  return {
    type: REMOVE_AUTH
  };
};

export const authenticate =
  (authentication, user = null, permissions = null) =>
  async (dispatch) => {
    dispatch(addAuth(authentication));
    if (user) {
      dispatch(addMe(user));
    }
  };

export const logout = () => async (dispatch) => {
  dispatch(removeAuth());
  dispatch(removeMe());
};
