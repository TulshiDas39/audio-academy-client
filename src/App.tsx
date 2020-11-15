import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { PublicLayout } from './components/layouts/subComponents';
import { Main } from './components/main/main';
import { LayoutRoutes } from './lib';

function App() {
  return (
    <BrowserRouter>
        <Main />
    </BrowserRouter>
  );
}

export default App;
