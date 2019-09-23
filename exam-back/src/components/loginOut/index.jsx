/*
 * 退出登录弹框
 * @Author: yixian
 * @Date: 2019-09-08 20:22:06
 * @Last Modified by: yixian
 * @Last Modified time: 2019-09-08 20:43:35
 */

import React, { Component } from 'react';
import { Modal } from 'antd';

class LoginOut extends Component {
	showModal = () => {
		this.setState({
			visible: true
		});
	};

	handleOk = e => {
		this.props.handle('ok');
	};

	handleCancel = e => {
		this.props.handle('no');
	};

	render() {
		return (
			<div>
				<Modal
					title='退出登录'
					visible={this.props.visible}
					onOk={this.handleOk}
					onCancel={this.handleCancel}>
					<p>确定要退出当前登录吗 亲 ?</p>
				</Modal>
			</div>
		);
	}
}
export default LoginOut;
