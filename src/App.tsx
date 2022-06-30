import React from 'react';

import GlobalStyle from './pages/styles/global';
import { AuthProvider } from './hooks/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';
import Rotas from './routes';
import ToastContainer from './components/ToastContainer';
const App: React.FC = () => {
  return (
    <>
      <Router>
        <AuthProvider>
        <Rotas/>
        </AuthProvider>
        <ToastContainer/>
        <GlobalStyle/>
      </Router>
    </>
  );
}

export default App;
