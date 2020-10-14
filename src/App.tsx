import React from 'react';
import './App.css';
import { theme } from './styles/theme';
import { ThemeProvider } from 'styled-components';

import { TodayBeerList } from './components/list/TodayBeerList';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <TodayBeerList />
    </ThemeProvider>
  );
};

export default App;
