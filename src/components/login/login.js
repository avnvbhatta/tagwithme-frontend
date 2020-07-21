import React, {useState, useContext} from 'react';
import { useHistory, Link } from "react-router-dom";
import './login.scss'
import { Form, Input, Button, Checkbox, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from "axios";
import {connect} from "react-redux";

const LoginForm = (props) => {
    //method to navigate to other pages
    const history = useHistory();
    //states for errors during API calls
    const [errors, setErrors] = useState(null);
    //On form submit
    const onFinish = async values => {
        //API call to users endpoint. Gets user info, 
        //stores it in global context and navigates to /home

        try {
            let loginResponse = await axios.post(process.env.REACT_APP_API_LOGIN_ENDPOINT, values);
            localStorage.setItem('jwt', loginResponse.data.token);
            props.logIn(loginResponse.data.token)

            const axiosForAPI = axios.create({
                headers: {
                    Authorization: `Bearer ${loginResponse.data.token}`
                }
              }) 
    
            let checkLoggedInResponse = await axiosForAPI.get(process.env.REACT_APP_API_LOGIN_STATUS_ENDPOINT);
            if(checkLoggedInResponse.data.isAuthenticated){
                props.checkLoggedIn(checkLoggedInResponse.data);
                history.push('/home');
               
            }

        } catch (error) {
            console.log(error);
            setErrors([{message: 'Invalid login.'}])
        }
            
    };

    return (
        <div className="login-container">
            <div className="login-div">
                <h2>TagWithMe</h2>
                <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                    <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Please enter your username.' }]}
                >
                        <Input prefix={<UserOutlined className="icon site-form-item-icon" />} placeholder="User Email" />
                    </Form.Item>
                    <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please enter your password.' }]}
                >
                        <Input
                        prefix={<LockOutlined className="icon site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                        </Form.Item>
                        <Form.Item>
                            <div className="assist-div">
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>
                                <a className="login-form-forgot link" href="/">
                                    Forgot password?
                                </a>
                            </div>
                        </Form.Item>

                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        <div className="div-footer">
                            Don't have an account?
                            <Link to="/signup" className="link">
                                Sign Up
                            </Link>
                        </div>
                    </Form>
                    {errors ? errors.map(error=>
                         <Alert className="alert" key={error.message} message={error.message} type="error" showIcon />
                    ) : null  }
                </div>
            </div>
    )
}
 

const mapDispatchToProps = (dispatch) => {
    return{
        checkLoggedIn: (response) => dispatch({type: 'CHECK_USER_LOGGED_IN' , val:response}),
        logIn: (response) => dispatch({type: 'USER_LOGIN' , val:response}),
    }
}

export default connect(null, mapDispatchToProps)(LoginForm);