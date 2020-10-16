import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import configureStore from './Store';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';

import Signin from './containers/Signin';
import Nav from './containers/Nav';
import { Signup } from './components/users/Signup';

import Home from './components/page/Home';

const store = configureStore();

const App = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Route path='/' component={Nav} />
        <Switch>
          <Route path='/signin' component={Signin} />
          <Route path='/signup' component={Signup} />
          <Route exact path='/' component={Home} />
        </Switch>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
