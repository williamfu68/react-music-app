import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from "react-router-dom";
import App from './App';

ReactDOM.render(
  <React.Fragment>
    <HashRouter>
    <App />
    </HashRouter>
  </React.Fragment>,
  document.getElementById('root')
);
