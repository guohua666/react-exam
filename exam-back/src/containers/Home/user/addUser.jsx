/*
 * 添加用户
 * @Author: yixian
 * @Date: 2019-09-06 16:27:32
 * @Last Modified by: jiaze
 * @Last Modified time: 2019-09-09 00:01:28
 */

import '@/assets/css/user/addUser.css';
import React, { Component } from 'react';
import View from '@/components/user/view';
import { Button, Radio, Form } from 'antd';
import AddApi from '@/components/user/addApi';
import AddUsers from '@/components/user/addUser';
import UpdateUser from '@/components/user/updateUser';
import { identityId, viewAuthority } from '@/api/user';
import AddIdentity from '@/components/user/addIdentity';
import IdentityApi from '@/components/user/identityApi';
import IdentityView from '@/components/user/identityView';

@Form.create()
class AddUser extends Component {
	state = {
		size: '添加用户',
		identityId: [],
		viewAuthority: []
	};
	handleSizeChange = e => {
		this.setState({ size: e.target.value });
	};
	render() {
		const { size, identityId, viewAuthority } = this.state;
		return (
			<div className='addUser'>
				<div
					className='
						addUser_wrapper 
						addUser_wrapper_left 
						addUser_wrapper_top 
						addUser_wrapper_right 
						addUser_wrapper_bottom
               	 '>
					<div className='addUserItem'>
						<Radio.Group
							value={size}
							onChange={this.handleSizeChange}>
							<Radio.Button value='添加用户'>
								添加用户
							</Radio.Button>
							<Radio.Button value='更新用户'>
								更新用户
							</Radio.Button>
						</Radio.Group>
					</div>
					{size === '添加用户' ? (
						<AddUsers identityId={identityId} />
					) : (
						<UpdateUser identityId={identityId} />
					)}
				</div>
				<div
					className='
                                addUser_wrapper
                                addUser_wrapper_top 
                                addUser_wrapper_right 
                                addUser_wrapper_bottom
                '>
					<div className='addUserItem'>
						<Button type='primary' ghost>
							添加身份
						</Button>
					</div>
					<AddIdentity />
				</div>
				<div
					className='
                                addUser_wrapper 
                                addUser_wrapper_top 
                                addUser_wrapper_right 
                                addUser_wrapper_bottom
                '>
					<div className='addUserItem'>
						<Button type='primary' ghost>
							添加api接口权限
						</Button>
					</div>
					<AddApi />
				</div>
				<div
					className='
                                addUser_wrapper 
                                addUser_wrapper_left 
                                addUser_wrapper_right 
                                addUser_wrapper_bottom
                '>
					<div className='addUserItem'>
						<Button type='primary' ghost>
							添加视图接口权限
						</Button>
					</div>
					<View viewAuthority={viewAuthority} />
				</div>
				<div
					className='
                                addUser_wrapper 
                                addUser_wrapper_right 
                                addUser_wrapper_bottom
                '>
					<div className='addUserItem'>
						<Button type='primary' ghost>
							给身份设置api接口权限
						</Button>
					</div>
					<IdentityApi identityId={identityId} />
				</div>
				<div
					className='
                                addUser_wrapper 
                                addUser_wrapper_right 
                                addUser_wrapper_bottom
                '>
					<div className='addUserItem'>
						<Button type='primary' ghost>
							给身份设置试图权限
						</Button>
					</div>
					<IdentityView
						identityId={identityId}
						viewAuthority={viewAuthority}
					/>
				</div>
			</div>
		);
	}

	componentDidMount() {
		//请求
		identityId().then(res => {
			this.setState({
				identityId: res.data
			});
		});
		viewAuthority().then(res => {
			this.setState({
				viewAuthority: res.data
			});
		});
	}
}
export default AddUser;
