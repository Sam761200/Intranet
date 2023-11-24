// App.js
import React from 'react';
import { AuthProvider } from './context/AuthContext';
import Routes from './components/Routes';

const App = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};

export default App;
