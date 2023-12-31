import React from 'react';
import './Styles/App.scss';
import './Styles/NavBar.scss'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage } from './Pages/LoginPage';
import { SignupPage } from './Pages/SignupPage';
import { HomePage } from './Pages/HomePage';
import { NavBar } from './Components/NavBar';
import { UserProvider } from './Context/UserContext';
// import { Footer } from './Components/Footer';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>

        <NavBar />
        <Routes>
          <Route path="/" element={< HomePage />} />
          <Route path="/home" element={<HomePage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
        {/* <Footer /> */}
      </UserProvider>

    </BrowserRouter>
  );

}

export default App;