import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import configureStore from './Store';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';

import { SigninContainerWithRouter } from './containers/Signin';
import { SignupContainerWithRouter } from './containers/Signup';
import { NavContainerWithRouter } from './containers/Nav';

import Home from './components/page/Home';

const store = configureStore();

const App = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Route path='/' component={NavContainerWithRouter} />
        <Switch>
          <Route path='/signin' component={SigninContainerWithRouter} />
          <Route path='/signup' component={SignupContainerWithRouter} />
          <Route exact path='/' component={Home} />
        </Switch>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
