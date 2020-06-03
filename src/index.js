import React from 'react';
import ReactDOM from 'react-dom';
import { Design } from './views/design/design';
import * as serviceWorker from './serviceWorker';
import './index.scss';

ReactDOM.render(
  <React.StrictMode>
    <Design />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
