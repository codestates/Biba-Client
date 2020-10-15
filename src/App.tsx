import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './Store';
import { theme } from './styles/theme';
import { ThemeProvider } from 'styled-components';

import { Home } from './components/page/Home';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Switch>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
