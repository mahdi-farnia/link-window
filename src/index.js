import React from 'react';
import ReactDOM from 'react-dom';
import './style/main.css';
import App from './App';
import rootReducer from './reducer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const store = createStore(rootReducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
