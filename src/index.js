import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { init } from '@phoenixlan/phoenix.js';
export const BASE_URL = process.env.REACT_APP_API_URL??"https://api.phoenixlan.no";

const initialize = () => {
  init(BASE_URL); //init(process.env.BASE_URL);
};

initialize()


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
