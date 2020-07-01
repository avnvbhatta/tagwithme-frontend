import React, {useState, useContext} from 'react';
import { useHistory, Link } from "react-router-dom";
import './login.scss'
import { Form, Input, Button, Checkbox, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Axios from "axios";
import { UserContext } from '../../utils/usercontext';


const LoginForm = (props) => {
    //method to update context value of user
    const {setUser} = useContext(UserContext);
    //method to navigate to other pages
    const history = useHistory();
    //states for errors during API calls
    const [errors, setErrors] = useState(null);
     
    //On form submit
    const onFinish = values => {
        //API call to users endpoint. Gets user info, 
        //stores it in global context and navigates to /home
        Axios.post('http://localhost:4000/users/login', values).then(res=>{
            console.log(res)
            const user = {
                id: res.data.id,
                name: res.data.name,
                email: res.data.email
            }
            const data = {
                authenticated: true,
                userData: user
            }
            setUser(data);
            history.push('/home')
        }).catch(err => {
            if(err.response){
                console.log(err.response)
                setErrors(err.response.data)
            }
        })        
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
 
export default LoginForm;