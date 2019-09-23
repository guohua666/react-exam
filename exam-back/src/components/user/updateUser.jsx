/*
 * @Author: yixian
 * @Date: 2019-09-06 17:04:57
 * @Last Modified by: yixian
 * @Last Modified time: 2019-09-06 19:21:10
 */
import React, { Component } from 'react';
import { Button, Form, Input, Select, message } from 'antd';
import { getUserList, updateUser } from '@/api/user';

const { Option } = Select;

@Form.create()
class UpdateUser extends Component {
	state = {
		userName: []
	};
	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				updateUser(values).then(res => {
					if (res.data.code === 1) {
						message.success('更新成功');
						this.props.form.resetFields();
					}
				});
			}
		});
	};
	render() {
		const { userName } = this.state;
		const { getFieldDecorator } = this.props.form;
		return (
			<Form onSubmit={this.handleSubmit}>
				<Form.Item className='addUserItem'>
					{getFieldDecorator('userName', {
						rules: [
							{
								required: true,
								message: '请选择身份id'
							}
						]
					})(
						<Select placeholder='请选择身份id'>
							{userName
								? userName.map(item => (
										<Option
											key={item.user_id}
											value={item.user_id}>
											{item.username}
										</Option>
								  ))
								: null}
						</Select>
					)}
				</Form.Item>
				<Form.Item className='addUserItem'>
					{getFieldDecorator('addUserName', {
						rules: [
							{
								required: true,
								message: 'Please input your username!'
							}
						]
					})(<Input placeholder='请输入用户名' />)}
				</Form.Item>
				<Form.Item className='addUserItem'>
					{getFieldDecorator('addPassWord', {
						rules: [
							{
								required: true,
								message: 'Please input your password!'
							}
						]
					})(<Input placeholder='请输入密码' type='password' />)}
				</Form.Item>
				<Form.Item className='addUserItem'>
					{getFieldDecorator('identityId', {
						rules: [
							{
								required: true,
								message: '请选择身份id'
							}
						]
					})(
						<Select placeholder='请选择身份id'>
							{this.props.identityId
								? this.props.identityId.map(item => (
										<Option
											key={item.id}
											value={item.identity_id}>
											{item.identity}
										</Option>
								  ))
								: null}
						</Select>
					)}
				</Form.Item>
				<Form.Item>
					<Button type='primary' htmlType='submit'>
						确定
					</Button>
					<Button
						style={{ marginLeft: 8 }}
						onClick={() => {
							this.props.form.resetFields();
						}}>
						重置
					</Button>
				</Form.Item>
			</Form>
		);
	}
	componentDidMount() {
		getUserList().then(res => {
			this.setState({
				userName: res.data
			});
		});
	}
}
export default UpdateUser;
