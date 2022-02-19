import { combineReducers } from 'redux';
import testReducer from '../../sandbox/testReducer';
import asyncReducer from '../async/asyncReducer';
import authReducer from '../auth/reducer/authReducer';
import modalReducer from '../auth/reducer/modalReducer';
import { connectRouter } from 'connected-react-router';
import courseReducer from '../course/courseReducer';

const rootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    test: testReducer,
    modals: modalReducer,
    async: asyncReducer,
    course: courseReducer,
  });

export default rootReducer;
