import React from 'react';

import GlobalStyle from './pages/styles/global';
import { AuthProvider } from './hooks/auth';
import { BrowserRouter as Router } from 'react-router-dom';
import Rotas from './routes';
import AppProvider from './hooks';
const App: React.FC = () => {
  return (
    <>
      <Router>
        <AppProvider>
          <AuthProvider>
          <Rotas/>
          </AuthProvider>
          <GlobalStyle/>
        </AppProvider>
      </Router>
    </>
  );
}

export default App;
