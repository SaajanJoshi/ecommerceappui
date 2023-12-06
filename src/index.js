// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { UserProvider } from './context/UserContext';
import './index.css';
import App from './containers/App'; // Fixed the casing issue


ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
