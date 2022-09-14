import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css";
import App from './App';
import { BrowserRouter } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './app/store';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:3000/";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

