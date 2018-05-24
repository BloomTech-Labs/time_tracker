import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { timestampReducer } from './timestampReducer';

const rootReducer = combineReducers({
  userReducer,
  timestampReducer
});

export default rootReducer;
