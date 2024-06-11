import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Routes,
  Route,
} from "react-router-dom";
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import AddMedicine from './components/AddMedicine';
import { IP } from './components/Constant';
import './index.css'
function App() {
  const [token_code, setTokenCode] = useState('');
  console.log('token_code===', localStorage.getItem("token_code"))
  useEffect(() => {
    axios.get(IP + 'ventilia-api/api/auth/auth/' + localStorage.getItem("token_code"), {
      headers: {
        'token_code': localStorage.getItem("token_code"),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Access-Control-Allow-Headers': '*'
      }
    }).then((response) => {
      console.log('response==', response.data.data.token_code)
      setTokenCode(response.data.data.token_code);
    }).catch(err => console.log('response catch', err));
  }, [])
  if (token_code) {

    return (
      <>
        <Header />
        <Sidebar />
        <Routes>
          <Route path="/" element={<AddMedicine />} />
          <Route path="/AddMedicine" element={<AddMedicine />} />
        </Routes>
      </>
    )
  }
  else {
    return (
      <div className="App">
        <Login />
      </div>
    )
  }
}

export default App;
