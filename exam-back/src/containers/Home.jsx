/*
 * @Author: jiaze
 * @Date: 2019-09-03 14:24:28
 * @Last Modified by: jiaze
 * @Last Modified time: 2019-09-10 20:13:28
 */

import 'antd/dist/antd.css';
import { connect } from 'dva';
import Cookie from 'js-cookie';
import '@/assets/css/home/home.css';
import { identityView } from '@/api/user';
import siderBar from '@/config/siderBar';
import React, { Component } from 'react';
import LoginOut from '@/components/loginOut';
import { Layout, Menu, Icon, Dropdown, Button } from 'antd';

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
const mapState2Props = state => {
	return state.login;
};

@connect(mapState2Props)
class Home extends Component {
	state = {
		collapsed: false,
		newSiderBar: [],
		visible: false
	};
	render() {
		const menu = (
			<Menu>
				<Menu.Item key='1'>个人中心</Menu.Item>
				<Menu.Item key='2'>我的班级</Menu.Item>
				<Menu.Item
					key='3'
					onClick={() => {
						this.props.history.push('/main/addHeadImg');
					}}>
					设置
				</Menu.Item>
				<Menu.Item key='4' onClick={this.loginOut}>
					退出登录
				</Menu.Item>
			</Menu>
		);
		return (
			<Layout>
				<Header>
					<div className='logo'>
						<img src='/public/static/img/logo.jpg' alt='logo' />
					</div>
					<Dropdown overlay={menu}>
						<Button className='user'>
							{!this.props.headImg ? (
								localStorage.getItem('HeadImg')?(<img
									src={localStorage.getItem('HeadImg')}
									alt='头像'
								/>):
								
								<img src='/public/static/img/timg.jpg' alt='头像' />
							) : (
									
									<img src={this.props.headImg} alt='头像' />
								)}
							<b>{this.props.name}</b>
						</Button>
					</Dropdown>
				</Header>
				<Layout>
					<Sider>
						<Menu style={{ width: 256 }} mode='inline' theme='dark'>
							{this.state.newSiderBar.map(item => {
								return (
									item.isShow && (
										<SubMenu
											key={item.id}
											title={
												<span>
													<Icon type={item.icon} />
													<span>{item.name}</span>
												</span>
											}>
											{item.children &&
												item.children.map(v => {
													return (
														v.isShow && (
															<Menu.Item
																key={v.id}
																onClick={() => {
																	this.props.history.push(
																		v.path
																	);
																}}>
																{v.name}
															</Menu.Item>
														)
													);
												})}
										</SubMenu>
									)
								);
							})}
						</Menu>
					</Sider>
					<Content
						style={{
							background: '#F0F2F5',
							padding: 24,
							margin: 0,
							minHeight: 280
						}}>
						{this.props.children}
					</Content>
				</Layout>
				<LoginOut visible={this.state.visible} handle={this.handle} />
			</Layout>
		);
	}
	componentDidMount() {
		
		sessionStorage.setItem('name',this.props.name)
		let id = Cookie.get('identity_id');
		if (id * 1 === 2) {
			this.props.history.push('/main/watchQuestions');
		} else if (id * 1 === 0) {
			this.props.history.push('/main/addUser');
		}
		identityView(id).then(({ data }) => {
			siderBar.forEach(item => {
				item.isShow = false;
				item.children.forEach(v => {
					v.isShow = false;
				});
			});
			let newdata = [];
			if (id * 1 === 666) {
				siderBar.forEach(item => {
					item.isShow = true;
					item.children.forEach(v => {
						v.isShow = true;
					});
				});
			} else {
				siderBar.forEach(item => {
					item.children.forEach(v => {
						data.forEach(m => {
							if (v.name === m.view_authority_text) {
								v.isShow = true;
							}
						});
					});
				});
				siderBar.forEach(item => {
					item.isShow = item.children.some(v => {
						return v.isShow;
					});
				});
			}
			newdata = siderBar;
			this.setState({
				newSiderBar: newdata
			});
		});
	}
	loginOut = () => {
		this.setState({
			visible: true
		});
	};
	handle = type => {
		if (type === 'ok') {
			this.setState({
				visible: false
			});
			this.props.history.push('/login');
			Cookie.set('id', '');
			Cookie.set('identity_id', '');
			Cookie.set('token', '');
		} else if (type === 'no') {
			this.setState({
				visible: false
			});
		}
	};
}

export default Home;
