/*
 * 添加身份
 * @Author: yixian
 * @Date: 2019-09-03 11:48:47
 * @Last Modified by: jiaze
 * @Last Modified time: 2019-09-09 07:54:49
 */

import React, { Component } from 'react';
import { Button, Form, Input } from 'antd';

@Form.create()
class AddIdentity extends Component {
	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
				this.props.form.resetFields();
			}
		});
	};
	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<Form onSubmit={this.handleSubmit}>
				<Form.Item className='addUserItem'>
					{getFieldDecorator('identityName', {
						rules: [
							{
								required: true,
								message: 'Please input your identityName!'
							}
						]
					})(<Input placeholder='请输入身份名称' />)}
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
export default AddIdentity;
