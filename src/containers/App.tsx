import React from 'react';
import { RouterProps } from 'react-router';
import { Provider } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import configureStore from '../containers/store';

import { App } from '../components/App';

const store = configureStore();

export interface AppProps {
  props: RouterProps;
}

export const AppContainer = (props: RouterProps): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App props={props} />
      </Provider>
    </ThemeProvider>
  );
};

export const AppContainerWithRouter = withRouter(AppContainer);
