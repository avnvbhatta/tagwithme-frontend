import React from 'react';
import './signup.scss'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import LoginForm from "../login/login";

const SignUpForm = () => {
    const onFinish = values => {
        console.log('Received values of form: ', values);
    };
    return (
        <div className="signup-container">
            <div className="signup-div">
                <h2>TagWithMe</h2>
                <Form
                name="normal_signup"
                className="signup-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >       <Form.Item
                    name="fullname"
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
                                <a href="/">Log In</a>
                            </Link>
                        </div>
                    </Form>
                </div>
            </div>
    )
}
 
export default SignUpForm;