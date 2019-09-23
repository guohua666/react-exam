/*
 * 用户展示
 * @Author: yixian
 * @Date: 2019-09-03 11:52:32
 * @Last Modified by: jiaze
 * @Last Modified time: 2019-09-09 00:01:37
 */

import { Radio } from 'antd';
import '@/assets/css/user/showUser.css';
import React, { Component } from 'react';
import ShowUserList from '@/components/user/showUserList';
import {
	userIdentity,
	identityId,
	apiAuthority,
	identityApiAuthority,
	viewAuthority,
	identityViewAuthority
} from '@/api/user';
import {
	userData,
	identityColumns,
	apiAuthorityColumns,
	identityApiColumns,
	viewAuthorityColumns,
	identityViewColumns
} from '@/config/showUser';

class ShowUser extends Component {
	state = {
		size: '用户数据',
		userList: [],
		identityList: [],
		apiAuthorityList: [],
		identityApiList: [],
		viewAuthorityList: [],
		identityViewList: []
	};
	handleSizeChange = e => {
		this.setState({ size: e.target.value });
	};
	render() {
		const {
			size,
			userList,
			identityList,
			apiAuthorityList,
			identityApiList,
			viewAuthorityList,
			identityViewList
		} = this.state;
		return (
			<div className='showUser'>
				<Radio.Group value={size} onChange={this.handleSizeChange}>
					<Radio.Button value='用户数据'>用户数据</Radio.Button>
					<Radio.Button value='身份数据'>身份数据</Radio.Button>
					<Radio.Button value='api接口权限'>api接口权限</Radio.Button>
					<Radio.Button value='身份和api接口关系'>
						身份和api接口关系
					</Radio.Button>
					<Radio.Button value='视图接口权限'>
						视图接口权限
					</Radio.Button>
					<Radio.Button value='身份和视图权限关系'>
						身份和视图权限关系
					</Radio.Button>
				</Radio.Group>
				<h2 className='showUserTitles'>{size}</h2>
				<div className='showUserList'>
					{size === '用户数据' ? (
						<ShowUserList columns={userData} data={userList} />
					) : null}
					{size === '身份数据' ? (
						<ShowUserList
							columns={identityColumns}
							data={identityList}
						/>
					) : null}
					{size === 'api接口权限' ? (
						<ShowUserList
							columns={apiAuthorityColumns}
							data={apiAuthorityList}
						/>
					) : null}
					{size === '身份和api接口关系' ? (
						<ShowUserList
							columns={identityApiColumns}
							data={identityApiList}
						/>
					) : null}
					{size === '视图接口权限' ? (
						<ShowUserList
							columns={viewAuthorityColumns}
							data={viewAuthorityList}
						/>
					) : null}
					{size === '身份和视图权限关系' ? (
						<ShowUserList
							columns={identityViewColumns}
							data={identityViewList}
						/>
					) : null}
				</div>
			</div>
		);
	}
	componentDidMount() {
		userIdentity().then(res => {
			this.setState({
				userList: res.data.map(el => {
					return {
						...el,
						key: el.username
					};
				})
			});
		});
		identityId().then(res => {
			this.setState({
				identityList: res.data.map(item => {
					return {
						...item,
						key: item.identity_id
					};
				})
			});
		});
		apiAuthority().then(res => {
			this.setState({
				apiAuthorityList: res.data.map(item => {
					return {
						...item,
						key: item.api_authority_id
					};
				})
			});
		});
		identityApiAuthority().then(res => {
			this.setState({
				identityApiList: res.data.map(item => {
					return {
						...item,
						key: item.api_authority_text
					};
				})
			});
		});
		viewAuthority().then(res => {
			this.setState({
				viewAuthorityList: res.data.map(item => {
					return {
						...item,
						key: item.view_authority_id
					};
				})
			});
		});
		identityViewAuthority().then(res => {
			this.setState({
				identityViewList: res.data.map(item => {
					return {
						...item,
						key: item.view_authority_text
					};
				})
			});
		});
	}
}
export default ShowUser;
