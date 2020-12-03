import React, { Suspense } from 'react';
import './App.css';
import { Routes, Router } from './routes';

const App = () => {
  return (
    <Suspense>
      <Router routes={Routes} defaultRoute={Routes[0].path} />
    </Suspense>
  );
};

export default App;
