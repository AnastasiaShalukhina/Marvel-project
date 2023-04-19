import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import reportWebVitals from './reportWebVitals';

import './assets/fonts/RobotoCondensed-Bold.woff2';
import './assets/fonts/RobotoCondensed-Bold.woff';
import './assets/fonts/RobotoCondensed-Bold.ttf';

import './assets/fonts/RobotoCondensed-Regular.woff2';
import './assets/fonts/RobotoCondensed-Regular.woff';
import './assets/fonts/RobotoCondensed-Regular.ttf';

import './style/style.scss';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode> render of CharList occured to be twice with StrictMode
  <App />
);

reportWebVitals();
