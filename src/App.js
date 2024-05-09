import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './page/Login';
import PasswordRecover from './page/Password-recover';
import PasswordRecoverConfirm from './page/Password-recover-confirm';
import Dashboard from './page/Dashboard';
import './App.css';


function App() {
  return (
  
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/password-recover" element={<PasswordRecover />} />
            <Route path="/password-recover-confirm" element={<PasswordRecoverConfirm />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </div>
   
  );
}

export default App;
