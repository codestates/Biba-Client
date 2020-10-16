import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import configureStore from './Store';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';

import { NavContainerWithRouter } from './containers/Nav';
import { LoginContainerWithRouter } from './containers/user/Login';
import { SignupContainerWithRouter } from './containers/user/Signup';
import { MypageContainerWithRouter } from './containers/user/Mypage';

import Home from './components/page/Home';

const store = configureStore();

const App = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Route
          path={['/login', '/signup', '/mypage']}
          component={NavContainerWithRouter}
        />
        <Route exact path='/' component={NavContainerWithRouter} />
        <Switch>
          <Route path='/login' component={LoginContainerWithRouter} />
          <Route path='/signup' component={SignupContainerWithRouter} />
          <Route path='/mypage' component={MypageContainerWithRouter} />
          <Route exact path='/' component={Home} />
        </Switch>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
