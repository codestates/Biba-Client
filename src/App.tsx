import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import configureStore from './Store';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';

import Signin from './containers/Signin';
import { Signup } from './components/users/Signup';

import { Home } from './components/page/Home';

const store = configureStore();

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Switch>
          <Route path='/signin'>
            <Signin />
          </Route>
          <Route path='/signup'>
            <Signup />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
