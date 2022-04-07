import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();
export function configureStore() {
  const store = createStore(
    rootReducer(history),
    composeWithDevTools(applyMiddleware(thunk))
  );
  return store;
}
