import React from 'react';
import MyButton from "../src/components/button/button";
import Header from "../src/components/header/header";
import LoginForm from "../src/components/login/login";
import SignupForm from "../src/components/signup/signup";
import { Switch, Route, Link } from 'react-router-dom';

import './App.css';
import Sidebar from './components/sidebar/sidebar';
import {BrowserRouter} from "react-router-dom";
import SignUpForm from '../src/components/signup/signup';



function App() {
  return (
    <div className="App">
      <Sidebar />
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <LoginForm />
          </Route>
          <Route path="/login">
            <LoginForm />
          </Route>
          <Route path="/signup">
            <SignUpForm />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
