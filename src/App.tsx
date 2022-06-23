import React from 'react';

import GlobalStyle from './pages/styles/global';
import SignIn from './pages/Signin';
import SignUp from './pages/SignUp';

import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => (
  <>
    <AuthProvider>
      {/* <SignIn/>       */}
      <SignUp/>
    </AuthProvider>
    <GlobalStyle/>
  </>
);

export default App;
