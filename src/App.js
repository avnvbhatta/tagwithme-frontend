import React from 'react';
import MyButton from "../src/components/button/button";
import Header from "../src/components/header/header";
import LoginForm from "../src/components/login/login";
import SignupForm from "../src/components/signup/signup";

import './App.css';
import Sidebar from './components/sidebar/sidebar';
import {BrowserRouter} from "react-router-dom";



function App() {
  return (
    <div className="App">
      <Sidebar />

      <BrowserRouter>
        <SignupForm />
      </BrowserRouter>
      
    </div>
  );
}

export default App;
