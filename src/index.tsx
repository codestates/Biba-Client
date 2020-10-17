import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from './styles/global-styles';

import { AppContainerWithRouter } from './containers/App';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <BrowserRouter>
      <AppContainerWithRouter />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
