import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { App } from './components/app';

ReactDOM.render(
  <React.StrictMode>
    <App text="random text for props example" />
  </React.StrictMode>,
  document.getElementById('root'),
);
