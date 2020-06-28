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

const { Sider,Content } = Layout;


function App() {
  return (
    <div className="App">
      {/* <Sidebar /> */}

      <BrowserRouter>
        <Layout>
          <Sidebar>Sider</Sidebar>
          <Layout>
            <Content>
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
              </Switch>
            </Content>
          </Layout>
        </Layout>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
