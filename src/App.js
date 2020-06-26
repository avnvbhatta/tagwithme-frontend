import React from 'react';
import LoginForm from "../src/components/login/login";
import { Switch, Route } from 'react-router-dom';

import './App.scss';
import {BrowserRouter} from "react-router-dom";
import SignUpForm from '../src/components/signup/signup';
import Profile from './components/profile/profile';
import EventsView from './components/events/eventsview';



function App() {
  return (
    <div className="App">
      {/* <Sidebar /> */}

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
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/events">
            <EventsView />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
