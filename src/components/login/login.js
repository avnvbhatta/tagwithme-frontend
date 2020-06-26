import React from 'react';
import './login.scss'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";

const LoginForm = () => {
    const history = useHistory();
    const onFinish = values => {
        console.log('Received values of form: ', values);
        const isValidLogin = true;

        //Navigate to mapview page if valid
        if(isValidLogin){
            history.push("/events");
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
                                <a className="login-form-forgot" href="/">
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
                                <a href="/">Sign Up</a>
                            </Link>
                        </div>
                    </Form>
                </div>
            </div>
    )
}
 
export default LoginForm;