import 'semantic-ui-css/semantic.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import 'react-toastify/dist/ReactToastify.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { configureStore, history } from './redux/store/configureStore';
import { ConnectedRouter } from 'connected-react-router';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
