import React, { useState, useMemo } from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
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
import { LoggedInContext } from './utils/loggedincontext';
import ProtectedRoute from './utils/protectedroute';
import { useEffect } from 'react';
import Axios from "axios";

const { Content } = Layout;


function App() {
  //Creating a context, or a global store to hold our user details.
  const [user, setUser] = useState(null);
  //will only change the providedUser value if the user is changed
  const providedUser = useMemo(() => ({ user, setUser }), [user, setUser]);

  //Creating a context to store if user is already logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //will only change the providedLoggedIn value if the loggedin value is changed
  const providedLoggedIn = useMemo(() => ({ isLoggedIn, setIsLoggedIn }), [isLoggedIn, setIsLoggedIn]);
  
  //Check if the session is still active or not
  useEffect(() => {
    Axios.get('http://localhost:4000/login-status').then(res=>{
      setIsLoggedIn(true)
      }).catch(err => {
          if(err.response){
              console.log(err.response)
          }
      }) 


  }, [])
  //Wrapping the parent layout with UserContext.Provider so that
  //the components within the UserContext.Provider will have access to providedUser
  return (
    <div className="App">
      <BrowserRouter>
      <UserContext.Provider value={providedUser}>
        <LoggedInContext.Provider value={providedLoggedIn}>
          <Layout>
            <Sidebar>Sider</Sidebar>
            <Layout>
              <Content>
                <Switch>
                    <Route path="/" exact > 
                      {isLoggedIn ? <Redirect to='/home' /> : <LoginForm/>}
                    </Route>
                    <Route path="/login" exact > 
                      {isLoggedIn ? <Redirect to='/home' /> : <LoginForm/>}
                    </Route>
                    <Route path="/signup" exact > 
                      {isLoggedIn ? <Redirect to='/home' /> : <SignUpForm/>}
                    </Route>
                    <ProtectedRoute path="/profile" component={Profile} />
                    <ProtectedRoute path="/home" component={EventsView} />
                    <ProtectedRoute path="/events" component={EventsView} />
                    <ProtectedRoute path="/messages" component={Messages} />
                    <ProtectedRoute path="/notifications" component={Notifications} />
                </Switch>
              </Content>
            </Layout>
          </Layout>
          </LoggedInContext.Provider>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
