import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import './App.css';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' />
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
        </Routes>
      </Router>
    </>
    
  );
}

export default App;
