import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import { theme } from './styles/theme';
import { ThemeProvider } from 'styled-components';

import { Home } from './components/page/Home';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </ThemeProvider>
  );
};

export default App;
