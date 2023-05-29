import { ADD_ME, REMOVE_ME } from '@constants/redux';

const meReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_ME:
      return {
        ...state,
        ...action.payload
      };
    case REMOVE_ME:
      return {};
    default:
      return state;
  }
};

export default meReducer;
