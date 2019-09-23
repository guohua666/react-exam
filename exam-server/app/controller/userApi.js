/*
 * @Author: yixian
 * @Date: 2019-09-06 17:43:07
 * @Last Modified by: xiaoyu
 * @Last Modified time: 2019-09-12 10:08:04
 */
const {
	Controller
} = require('egg');
const md5 = require('md5');
const {
	createToken
} = require('../utils');

class UserApiController extends Controller {
	/**
	 * @name 登录
	 */
	async login() {
		const {
			username,
			password
		} = this.ctx.request.body;
		//验证用户名
		const resultUser = await this.ctx.service.user.loginUsername(username);
		if (resultUser) {
			//验证密码
			const resultPass = await this.ctx.service.user.loginPassword(
				username,
				password
			);
			if (resultPass) {
				this.ctx.status = 200;
				let id = resultPass.id;
				let identity_id=resultPass.identity_id;
				let token = createToken(id);
				let username =resultPass.username;
				//存入token
				await this.ctx.service.user.setToken(id, token);
				this.ctx.body = {
					code: 1,
					msg: '登陆成功',
					id,
					token,
					identity_id,
					username
				};
			} else {
				this.ctx.body = {
					code: 0,
					msg: '密码错误'
				};
			}
		} else {
			this.ctx.body = {
				code: 0,
				msg: '用户名输入不正确'
			};
		}
	}
	/**
	 * @name 获取用户身份类型
	 */
	async identityId() {
		const resquest = await this.ctx.service.userApi.identityId();
		this.ctx.body = resquest;
	}
	/**
	 * @name 添加新用户
	 */
	async addUser() {
		const params = this.ctx.request.body;
		const user_id = md5(params.addUserName);
		const res = await this.ctx.service.userApi.isUser(params);
		if (res.length) {
			this.ctx.status = 401;
			this.ctx.body = {
				code: 0,
				msg: '此用户已存在'
			};
		} else {
			this.ctx.status = 200;
			const resquest = await this.ctx.service.userApi.addUser({
				...params,
				user_id
			});
			this.ctx.body = {
				code: 1,
				msg: '添加成功'
			};
		}
	}
	/**
	 * @name 查询所有用户信息
	 */
	async userInfo() {
		const res = await this.ctx.service.userApi.userInfo();
		this.ctx.body = res;
	}
	/**
	 * @name 更新用户
	 */
	async updateUser() {
		const params = this.ctx.request.body;
		this.ctx.status = 200;
		const resquest = await this.ctx.service.userApi.updateUser(params);
		this.ctx.body = {
			code: 1,
			msg: '更新成功'
		};
	}
	/**
	 * @name 添加api接口
	 */
	async addApi() {
		const params = this.ctx.request.body;
		this.ctx.status = 200;
		const resquest = await this.ctx.service.userApi.addApi(params);
		this.ctx.body = {
			code: 1,
			msg: '添加成功'
		};
	}
	/**
	 * @name 查询用户身份权限
	 */
	async userIdentity() {
		const res = await this.ctx.service.userApi.userIdentity();
		this.ctx.body = res;
	}
	/**
	 * @name 查询api接口
	 */
	async apiAuthority() {
		const res = await this.ctx.service.userApi.apiAuthority();
		this.ctx.body = res;
	}
	/**
	 * @name 查询身份与api接口关系
	 */
	async identityApiAuthority() {
		const res = await this.ctx.service.userApi.identityApiAuthority();
		this.ctx.body = res;
	}
	/**
	 * @name 查询视图接口
	 */
	async viewAuthority() {
		const res = await this.ctx.service.userApi.viewAuthority();
		this.ctx.body = res;
	}
	/**
	 * @name 查询身份与视图接口关系
	 */
	async identityViewAuthority() {
		const res = await this.ctx.service.userApi.identityViewAuthority();
		this.ctx.body = res;
	}
	/**
	 * @name 身份返回视图
	 */
	async identityView() {
		let {id}=this.ctx.params;
		const res = await this.ctx.service.userApi.identityView(id);
		this.ctx.body = res;
	}
}
module.exports = UserApiController;