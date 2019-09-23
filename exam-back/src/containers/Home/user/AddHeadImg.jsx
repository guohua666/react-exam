/*
 * @Author: jiaze 
 * @Date: 2019-09-05 15:11:51 
 * @Last Modified by: zgh
 * @Last Modified time: 2019-09-09 09:44:47
 */

import { connect } from "dva";
import React, { Component } from 'react';
import { Upload, Icon, message, Button } from 'antd';

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}
const mapState = state => {
    return state.upHeadImg
}

@connect(mapState)
class AddHeadImg extends Component {
    state = {
        loading: false,
    };
    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };
    upImg() {
        this.props.dispatch({
            type: "login/upHeadImg",
            payload: this.state.imageUrl
        }).then(() => {
            message.success("设置成功")
        })
    }
    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
             
            </div>
        );
        const { imageUrl } = this.state;
        return (
            <div>
                <h2>上传头像</h2>
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={beforeUpload}
                    onChange={this.handleChange}
                >
                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
                <Button className="updateBtn" onClick={this.upImg.bind(this)}>确认</Button>
            </div>
        );
    }
}

export default AddHeadImg;
