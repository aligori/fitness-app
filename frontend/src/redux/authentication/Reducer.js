import { ADD_AUTH, REMOVE_AUTH } from '@constants/redux';

const authenticationReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_AUTH:
      return {
        ...state,
        ...action.payload
      };
    case REMOVE_AUTH:
      return {};
    default:
      return state;
  }
};

export default authenticationReducer;
