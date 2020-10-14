import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import { theme } from './styles/theme';
import { ThemeProvider } from 'styled-components';

import { TodayBeerList } from './components/list/TodayBeerList';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route path='/'>
          <TodayBeerList />
        </Route>
      </Switch>
    </ThemeProvider>
  );
};

export default App;
