import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from './styles/global-styles';

import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';

import { AppContainerWithRouter } from './containers/AppContainer';
import configureStore from './containers/store';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <AppContainerWithRouter />
        </Provider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
