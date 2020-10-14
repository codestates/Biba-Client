import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './Store';
import { theme } from './styles/theme';
import { ThemeProvider } from 'styled-components';

import Signin from './components/signin/Signin';
import { TodayBeerList } from './components/list/TodayBeerList';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Switch>
          <Route path='/'>
            <Signin />
          </Route>
          <Route path='/'>
            <TodayBeerList />
          </Route>
        </Switch>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
