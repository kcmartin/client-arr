import { combineReducers } from 'redux';
// 'as' redeclares the 'reducer' variable as 'form'
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';

const rootReducer = combineReducers({
  // ES6 automatically expands to form: form since key and value are the same
  form,
  auth: authReducer
});

export default rootReducer;
