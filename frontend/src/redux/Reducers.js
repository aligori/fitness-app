import { combineReducers } from 'redux';
import spinnerReducer from './spinner/Reducer';
import meReducer from './me/Reducer';
import authenticationReducer from './authentication/Reducer';

const Reducers = combineReducers({
  authenticationReducer,
  meReducer,
  spinnerReducer
});

export default Reducers;
