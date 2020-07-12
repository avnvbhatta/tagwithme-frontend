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
import Axios from "axios";
import {connect} from "react-redux"

const { Content } = Layout;


const App = (props) => {
  //Check if the session is still active or not
  useEffect(() => {
    Axios.get(process.env.REACT_APP_API_LOGIN_STATUS_ENDPOINT).then(res=>{
      console.log(res.data)
        props.checkLoggedIn(res.data);
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
                    <ProtectedRoute path="/profile" component={Profile} />
                    <ProtectedRoute path="/home" component={EventsView} />
                    <ProtectedRoute path="/events" component={EventsView} />
                    <ProtectedRoute path="/messages" component={Messages} />
                    <ProtectedRoute path="/notifications" component={Notifications} />
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
