import React, {useState} from 'react';
import './login.scss'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import Axios from "axios";
import { Alert } from "antd"
import { useContext } from 'react';
import { UserContext } from '../../utils/usercontext';


const LoginForm = (props) => {
    const history = useHistory();
    const [errors, setErrors] = useState(null);
    const {user, setUser} = useContext(UserContext);

    const onFinish = values => {

        Axios.post('http://localhost:4000/users/login', values).then(res=>{
            const user = {
                id: res.data.id,
                name: res.data.name,
                email: res.data.email
            }
            const data = {
                authenticated: true,
                userData: user
            }
            setUser(user);
            history.push('/events')
        }).catch(err => {
            if(err.response){
                console.log(err.response)
            }
        })        
    };

    // const handleAuth = () =>{
    // Axios.get("http://localhost:4000/dashboard", {withCrendentials:true}).then(res=>{
    //     console.log(res)
    // }).catch(err => {
    //     if(err.response){
    //         console.log(err.response.data)
    //     }
    // })
    // }
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
                    {errors ? errors.map(error=>
                         <Alert className="alert" key={error.message} message={error.message} type="error" showIcon />
                    ) : null  }
                </div>
            </div>
    )
}
 
export default LoginForm;