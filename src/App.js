import React from 'react';
import LoginForm from "../src/components/login/login";
import { Switch, Route } from 'react-router-dom';

import './App.scss';
import {BrowserRouter} from "react-router-dom";
import SignUpForm from '../src/components/signup/signup';
import Profile from './components/profile/profile';
import EventsView from './components/events/eventsview';
import { Layout } from 'antd';
import Sidebar from './components/sidebar/sidebar';
import Messages from './components/messages/messages';
import Notifications from './components/notifications/notifications';
import { UserContext } from './utils/usercontext';
import { useState } from 'react';
import { useMemo } from 'react';


const { Sider,Content } = Layout;


function App() {
  //Creating a context, or a global store to hold our user details.
  const [user, setUser] = useState(null);
  //will only change the providedUser value if the user is changed
  const providedUser = useMemo(() => ({ user, setUser }), [user, setUser]);


  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Sidebar>Sider</Sidebar>
          <Layout>
            <Content>
              <Switch>
              <UserContext.Provider value={providedUser}>
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
                  <Route path="/home">
                    <EventsView />
                  </Route>
                  <Route path="/events">
                    <EventsView />
                  </Route>
                  <Route path="/messages">
                    <Messages />
                  </Route>
                  <Route path="/notifications">
                    <Notifications />
                  </Route>
                </UserContext.Provider>
                
              </Switch>
            </Content>
          </Layout>
        </Layout>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
