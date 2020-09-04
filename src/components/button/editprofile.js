import React, {useState} from 'react';
import "./interested.scss";
import { EditOutlined } from '@ant-design/icons';
import "./message.scss"
import {Modal, Button, Input, Form} from "antd";
import {connect} from "react-redux"
import "./editprofile.scss";
import axiosForAPI from "../../utils/axiosForAPI";

const EditProfile = (props) => {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const [form] = Form.useForm();
    const showModal = () => {
        setVisible(true);
    };
      
    const handleCancel = () => {
       setVisible(false);
       form.resetFields();
    };

    const onFinish = async values => {
        setLoading(true);
        let res = await axiosForAPI.post(process.env.REACT_APP_UPDATE_USER_ENDPOINT,  {id:props.id, name: values.name, city: values.city, state: values.state});
        props.updateUserProfile({ name: values.name, city: values.city, state: values.state})
        setLoading(false);
        setVisible(false);
        form.resetFields();
    };

    const layout = {
        labelCol: {
          span: 5,
        },
        wrapperCol: {
          span: 16,
        },
    };

    return (
        <div className="container">
            <button className="my-btn" style={{marginLeft: '10px'}} onClick={showModal}>
                <EditOutlined /> Edit Profile
            </button>
            <Modal
                visible={visible}
                title="Edit Profile"
                onCancel={handleCancel}
                footer={null}
                >

                <Form
                    form={form}
                    name="basic"
                    onFinish={onFinish}
                    {...layout}
                    >
                    <Form.Item
                        label="Name"
                        name="name"
                        initialValue={props.name}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="City"
                        name="city"
                        initialValue={props.city}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="State"
                        name="state"
                        initialValue={props.state}                        
                    >
                        <Input />
                    </Form.Item>

                    <div className="modal-footer">
                        <Button key="back" onClick={handleCancel}>
                            Cancel
                        </Button>,
                        <Button key="submit" htmlType="submit" type="primary" loading={loading}>
                            Save
                        </Button>
                    </div>
                </Form>
            </Modal>
            
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        userData: state.userData,
        id: state.userData.id,
        name: state.userData.name,
        city: state.userData.city,
        state: state.userData.state
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        updateUserProfile: (values) => dispatch({type:'UPDATE_USER_PROFILE', val: values})
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);