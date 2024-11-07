import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // your main React component
import './index.css';
import './theme.css'; // Importing the global theme styles

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
