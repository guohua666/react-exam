/*
 * 添加用户
 * @Author: yixian
 * @Date: 2019-09-03 11:49:59
 * @Last Modified by: jiaze
 * @Last Modified time: 2019-09-10 09:22:49
 */

import { addUser } from '@/api/user';
import React, { Component } from 'react';
import { Button, Form, Input, Select, message } from 'antd';

const { Option } = Select;

@Form.create()
class AddUsers extends Component {
	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				addUser(values)
					.then(res => {
						if (res.data.code === 1) {
							message.success('添加成功');
							this.props.form.resetFields();
						}
					})
					.catch(error => {
						message.error('此用户已存在');
					});
			}
		});
	};
	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<Form onSubmit={this.handleSubmit}>
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
					})(<Input placeholder='请输入密码' type="password"/>)}
				</Form.Item>
				<Form.Item className='addUserItem'>
					{getFieldDecorator('identityId', {
						rules: [
							{
								required: true,
								message: 'Please select your identityId!'
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
}
export default AddUsers;
