import React from 'react';
import { RouterProps } from 'react-router';
import { Provider } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import configureStore from '../containers/store';

import { App } from '../components/App';

const store = configureStore();

export const AppContainer = ({
  match,
  history,
  location,
}: RouteComponentProps): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App match={match} history={history} location={location} />
      </Provider>
    </ThemeProvider>
  );
};

export const AppContainerWithRouter = withRouter(AppContainer);
