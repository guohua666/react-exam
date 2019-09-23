/*
 * 添加视图接口权限
 * @Author: yixian
 * @Date: 2019-09-03 11:51:05
 * @Last Modified by: yixian
 * @Last Modified time: 2019-09-07 11:53:34
 */

import React, { Component } from 'react';
import { Button, Form, Select } from 'antd';

const { Option } = Select;

@Form.create()
class View extends Component {
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
					{getFieldDecorator('view', {
						rules: [
							{
								required: true,
								message: '请选择已有视图!'
							}
						]
					})(
						<Select placeholder='请选择已有视图'>
							{this.props.viewAuthority
								? this.props.viewAuthority.map(item => (
										<Option
											key={item.view_authority_id}
											value={item.view_id}>
											{item.view_authority_text}
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
export default View;
