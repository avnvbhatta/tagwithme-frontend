import React, { useState } from 'react';
import { Upload, message, Avatar } from 'antd';
import ImgCrop from 'antd-img-crop';
import { LoadingOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import {connect} from "react-redux";


const ImgUpload = (props) => {
    const [loading, setLoading] = useState(false)
    const imgUrlFromDB = props.imgurl ? `${process.env.REACT_APP_API_GET_UPLOAD_ENDPOINT}${props.imgurl}` : null;
    const [imageUrl, setImageurl] = useState(imgUrlFromDB || null);


    
    const handleChange = info => {
        if (info.file.status === 'uploading') {
            setLoading(true)
          return;
        }
        if (info.file.status === 'done') {
            props.uploadImg("1.png")
            setImageurl(`${process.env.REACT_APP_API_GET_UPLOAD_ENDPOINT}${info.file.response.url}`)
            setLoading(false);
        }
      };
      const uploadButton = (
        <div>
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div className="ant-upload-text">Upload</div>
        </div>
      );

      const beforeUpload = file => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
        if (!isJpgOrPng) {
          message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
      }
      return (
          <ImgCrop rotate beforeCrop={beforeUpload}>
            <Upload
            name="picture"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            method="post"
            action={process.env.REACT_APP_API_UPLOAD_ENDPOINT}
            data = {{userid: props.userid }}
            onChange={handleChange}
            >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton }
            </Upload>
        </ImgCrop>
      );
};

const mapStateToProps = (state) => {
    return{
        imgurl: state.userData.imgurl,
        userid: state.userData.id,
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        uploadImg: (imgurl) => dispatch({type: 'UPLOAD_IMAGE', val:imgurl})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ImgUpload);




