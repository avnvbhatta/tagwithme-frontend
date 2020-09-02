import React, {useState} from 'react';
import './signup.scss'
import { Form, Input, Button, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Axios from "axios";
import {ReactComponent as AppLogo} from '../../TagWithMeLogo.svg';


const SignUpForm = (props) => {
    //Used for storing errors to display alerts
    const [errors, setErrors] = useState(null);
    //Used for storing successful registration to display success alert
    const [signUpSuccess, setSignUpSuccess] = useState(false)
    //On form submit
    const onFinish = values => {
        //First clear errors
        setErrors(null)
        setSignUpSuccess(false)
        //If successful registration, set state
        Axios.post(process.env.REACT_APP_API_REGISTER_ENDPOINT, values).then(res=>{
            setSignUpSuccess(true);
        }).catch(err => {
            if(err.response){
                setErrors(err.response.data)
            }
        })

    };
    return (
        <div className="signup-container">
            <div className="signup-div">
                <AppLogo className="logo"/>
                <h2>TagWithMe</h2>
                <Form
                name="normal_signup"
                className="signup-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >       <Form.Item
                    name="name"
                    rules={[{ required: true, message: 'Please enter your full name.' }]}
                >
                        <Input prefix={<UserOutlined className="icon site-form-item-icon" />} placeholder="Full Name" />
                    </Form.Item>
                    <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Please enter your username.' }]}
                >
                        <Input prefix={<UserOutlined className="icon site-form-item-icon" />} placeholder="Email" />
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

                        <Button type="primary" htmlType="submit" className="signup-form-button">
                            Sign Up
                        </Button>
                        <div className="div-footer">
                            Already have an account?
                            <Link to="/login"  className="link">
                                Log In
                            </Link>
                        </div>
                    </Form>
                    {errors ? errors.map(error=>
                         <Alert className="alert" key={error.message} message={error.message} type="error" showIcon />
                    ) : null  }
                    {signUpSuccess ? 
                        <Alert
                            className="alert"
                            message="Account Created. Please log in."
                            type="success"
                            showIcon
                        /> : null}
                    
                </div>
            </div>
    )
}
 
export default SignUpForm;