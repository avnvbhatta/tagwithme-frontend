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
import ProtectedRoute from './utils/protectedroute';
import { useEffect } from 'react';
import axios from "axios";
import {connect} from "react-redux";
import GlobalFeed from './components/globalfeed/globalfeed';

const { Content } = Layout;

const App = (props) => {
  const storedJWT = localStorage.getItem('jwt');
  useEffect(() => {
    
    if(storedJWT){
      const checkLogin = async () => {
        try {
          const axiosForAPI = axios.create({
            headers: {
                Authorization: `Bearer ${storedJWT}`
            }
          }) 

          let loginResponse = await axiosForAPI.get(process.env.REACT_APP_API_LOGIN_STATUS_ENDPOINT);
          props.checkLoggedIn(loginResponse.data);

        } catch (error) {
          console.log(error)
        }
      }
       
      checkLogin();       
    }
    
  }, [storedJWT])

  //Wrapping the parent layout with UserContext.Provider so that
  //the components within the UserContext.Provider will have access to providedUser
   return (
    <div className="App">
      <BrowserRouter>
          <Layout>
            <Sidebar>Sider</Sidebar>
            <Layout>
              <Content>
                <Switch>
                    <Route path="/" exact > 
                      {props.isLoggedIn ? <Redirect to='/home' /> : <LoginForm/>}
                    </Route>
                    <Route path="/login" exact > 
                      {props.isLoggedIn ? <Redirect to='/home' /> : <LoginForm/>}
                    </Route>
                    <Route path="/signup" exact > 
                      {props.isLoggedIn ? <Redirect to='/home' /> : <SignUpForm/>}
                    </Route>
                    <ProtectedRoute exact path="/profile" component={Profile} />
                    <ProtectedRoute exact path="/profile/:userid" component={Profile} />
                    <ProtectedRoute exact path="/home"  component={EventsView} />
                    <ProtectedRoute exact path="/events" component={EventsView} />
                    <ProtectedRoute exact path="/messages"  component={Messages} />
                    <ProtectedRoute exact path="/notifications" component={Notifications} />
                    <ProtectedRoute exact path="/feed" component={GlobalFeed} />

                </Switch>
              </Content>
            </Layout>
          </Layout>
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn,
    userData: state.userData
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    checkLoggedIn: (response) => dispatch({type: 'CHECK_USER_LOGGED_IN' , val:response}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
