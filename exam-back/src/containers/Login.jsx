/*
 * @Author: jiaze 
 * @Date: 2019-09-03 15:06:19 
 * @Last Modified by: jiaze
 * @Last Modified time: 2019-09-10 20:07:52
 */

import "antd/dist/antd.css";
import { connect } from "dva";
import React, { Component } from "react";
import { Form, Input, Button, message } from "antd";

const mapState2Props = state => {
  return state.login;
};

@connect(mapState2Props)
@Form.create({
  name: "loginFrom",
  mapPropsToFields(props) {
    return {
      username: Form.createFormField({
        ...props.username,
        value: ""
      }),
      password: Form.createFormField({
        ...props.password,
        value: ""
      })
    };
  }
})

class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: "login/login",
          payload: values
        }).then(() => {
          if (this.props.value.data.code) {
            message.success(this.props.value.data.msg)
            this.props.history.push("/main/addQuestions")
          } else {
            message.error(this.props.value.data.msg)
          }
        });
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login">
        <div className="loginform">
          <h1>用户登录</h1>
          <Form
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            onSubmit={this.handleSubmit}
            className="login-form"
          >
            <Form.Item label="用户名">
              {getFieldDecorator("username", {
                rules: [
                  { required: true, message: "请输入您的用户名!" }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="密码">
              {getFieldDecorator("password", {
                rules: [
                  { required: true, message: "请输入您的密码!" }
                ]
              })(<Input type="password" />)}
            </Form.Item>
            <Form.Item wrapperCol={{ span: 12, offset: 2 }}>
              <Button type="primary" htmlType="submit" className="sub">
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default Login;
