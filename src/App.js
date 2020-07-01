import React, { useState, useMemo } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import './App.scss';
import { Layout } from 'antd';
import LoginForm from "../src/components/login/login";
import SignUpForm from '../src/components/signup/signup';
import Profile from './components/profile/profile';
import EventsView from './components/events/eventsview';
import Sidebar from './components/sidebar/sidebar';
import Messages from './components/messages/messages';
import Notifications from './components/notifications/notifications';
import { UserContext } from './utils/usercontext';
import ProtectedRoute from './utils/protectedroute';


const { Content } = Layout;


function App() {
  //Creating a context, or a global store to hold our user details.
  const [user, setUser] = useState(null);
  //will only change the providedUser value if the user is changed
  const providedUser = useMemo(() => ({ user, setUser }), [user, setUser]);

  //Wrapping the parent layout with UserContext.Provider so that
  //the components within the UserContext.Provider will have access to providedUser
  return (
    <div className="App">
      <BrowserRouter>
      <UserContext.Provider value={providedUser}>
        <Layout>
          <Sidebar>Sider</Sidebar>
          <Layout>
            <Content>
              <Switch>
                  <Route path="/" exact component={LoginForm} />
                  <Route path="/login" component={LoginForm} />
                  <Route path="/signup" component={SignUpForm} />
                  <ProtectedRoute path="/profile" component={Profile} />
                  <ProtectedRoute path="/home" component={EventsView} />
                  <ProtectedRoute path="/events" component={EventsView} />
                  <ProtectedRoute path="/messages" component={Messages} />
                  <ProtectedRoute path="/notifications" component={Notifications} />
              </Switch>
            </Content>
          </Layout>
        </Layout>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
