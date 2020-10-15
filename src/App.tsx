import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
<<<<<<< HEAD
import { store } from './Store';
import { theme } from './styles/theme';
=======
import configureStore from './Store';
>>>>>>> bc38b0fd96673fd18e447cab8bbb67b5d6d6d09b
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
<<<<<<< HEAD
=======
          <Route path='/signin'>
            <Signin />
          </Route>
          <Route path='/signup'>
            <Signup />
          </Route>
>>>>>>> bc38b0fd96673fd18e447cab8bbb67b5d6d6d09b
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
