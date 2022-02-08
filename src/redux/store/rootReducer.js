import { combineReducers } from 'redux';
import testReducer from '../../sandbox/testReducer';
import authReducer from '../auth/reducer/authReducer';
import modalReducer from '../auth/reducer/modalReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  test: testReducer,
  modals: modalReducer,
});

export default rootReducer;
