import { ADD_ME, REMOVE_ME } from '@constants/redux';

export const addMe = (payload) => {
  return {
    type: ADD_ME,
    payload
  };
};

export const removeMe = () => {
  return {
    type: REMOVE_ME
  };
};
