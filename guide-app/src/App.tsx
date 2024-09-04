import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar'
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import ChatWindow from './components/ChatWindow';
import  Account  from './components/Account';

function App() {
  //State for the user being logged in (null means not logged in)
  const [user, setUser] = useState(null);

  //Pass user and setUser as props to Account to force a render in the navbar.

  return (
    <>
      <Router>
        <Navbar user = {user} setUser={setUser}/>
        <Routes>
          <Route path='/'  element={<ChatWindow/>}/>
          <Route path='/account' element={<Account setUser={setUser}/>}/>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
        </Routes>
      </Router>
    </>
    
  );
}

export default App;
