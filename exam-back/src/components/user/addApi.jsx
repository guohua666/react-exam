/*
 * 添加api接口权限
 * @Author: yixian
 * @Date: 2019-09-03 11:48:31
 * @Last Modified by: jiaze
 * @Last Modified time: 2019-09-07 00:35:29
 */

import { addApi } from '@/api/user';
import React, { Component } from 'react';
import { Button, Form, Input, message } from 'antd';

@Form.create()
class AddApi extends Component {
	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				addApi(values).then(res => {
					if (res.data.code === 1) {
						message.success('添加成功');
						this.props.form.resetFields();
					}
				});
			}
		});
	};
	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<Form onSubmit={this.handleSubmit}>
				<Form.Item className='addUserItem'>
					{getFieldDecorator('apiName', {
						rules: [
							{
								required: true,
								message: '请输入api接口权限名称!'
							}
						]
					})(<Input placeholder='请输入api接口权限名称' />)}
				</Form.Item>
				<Form.Item className='addUserItem'>
					{getFieldDecorator('apiUrl', {
						rules: [
							{
								required: true,
								message: 'Please input your api接口权限url!'
							}
						]
					})(<Input placeholder='请输入api接口权限url' />)}
				</Form.Item>
				<Form.Item className='addUserItem'>
					{getFieldDecorator('apiMethod', {
						rules: [
							{
								required: true,
								message: 'Please input your api接口权限方法!'
							}
						]
					})(<Input placeholder='请输入api接口权限方法' />)}
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
export default AddApi;
