/*
 * @Author: yixian
 * @Date: 2019-09-06 17:48:17
 * @Last Modified by: jiaze
 * @Last Modified time: 2019-09-08 11:26:22
 */
const { Service } = require('egg');
const md5 = require('md5');

class UserApiService extends Service {
	/**
	 * @name 获取用户身份类型
	 */
	async identityId() {
		const user = await this.app.mysql.select('identity');
		return user;
	}
	/**
	 * @name 添加新用户
	 */
	async addUser(params) {
		const { user_id, addUserName, addPassWord, identityId } = params;
		const $sql = `insert into user (user_id,username, password, identity_id) values (?,?,?,?);`;
		const user = await this.app.mysql.query($sql, [
			user_id,
			addUserName,
			addPassWord,
			identityId
		]);
		return user;
	}
	/**
	 * @name 查看用户名是否存在
	 */
	async isUser(params) {
		const { addUserName } = params;
		const $sql = `select * from user where username='${addUserName}'`;
		const user = await this.app.mysql.query($sql);
		return user;
	}
	/**
	 * @name 查看所有用户信息
	 */
	async userInfo() {
		const user = await this.app.mysql.select('user');
		return user;
	}
	/**
	 * @name 更新用户
	 */
	async updateUser(params) {
		const { userName, addUserName, addPassWord, identityId } = params;
		const $sql = `update user set username='${addUserName}', password='${addPassWord}', identity_id='${identityId}' WHERE  user_id='${userName}';`;
		const user = await this.app.mysql.query($sql);
		return user;
	}
	/**
	 * @name 添加api接口
	 */
	async addApi(params) {
		const { apiName, apiUrl, apiMethod } = params;
		const $sql = `insert into api_authority (api_authority_text,api_authority_url, api_authority_method) values (?,?,?);`;
		const user = await this.app.mysql.query($sql, [
			apiName,
			apiUrl,
			apiMethod
		]);
		return user;
	}
	/**
	 * @name 查询用户身份权限
	 */
	async userIdentity() {
		const $sql = `select username,password,identity from identity,user where user.identity_id=identity.identity_id`;
		const user = await this.app.mysql.query($sql);
		return user;
	}
	/**
	 * @name 查询api接口
	 */
	async apiAuthority() {
		const user = await this.app.mysql.select('api_authority');
		return user;
	}
	/**
	 * @name 查询身份与api接口关系
	 */
	async identityApiAuthority() {
		const $sql = `select identity,api_authority_text,api_authority_url,api_authority_method from api_authority,identity_api_authority_relation,identity where api_authority.api_authority_id=identity_api_authority_relation.api_authority_id and identity.identity_id=identity_api_authority_relation.identity_id`;
		const user = await this.app.mysql.query($sql);
		return user;
	}
	/**
	 * @name 查询视图接口
	 */
	async viewAuthority() {
		const user = await this.app.mysql.select('view_authority');
		return user;
	}
	/**
	 * @name 查询身份与视图接口关系
	 */
	async identityViewAuthority() {
		const $sql = `select identity,view_authority_text,view_id from view_authority,identity_view_authority_relation,identity where view_authority.view_authority_id=identity_view_authority_relation.view_authority_id and identity.identity_id=identity_view_authority_relation.identity_id`;
		const user = await this.app.mysql.query($sql);
		return user;
	}
	/**
	 * @name 身份返回视图
	 */
	async identityView(id) {
		const $sql = `SELECT view_authority_text FROM view_authority,identity_view_authority_relation,identity WHERE identity.identity_id=identity_view_authority_relation.identity_id AND view_authority.view_authority_id=identity_view_authority_relation.view_authority_id AND identity.identity_id=${id}`
		const user = await this.app.mysql.query($sql);
		return user;
	}
}
module.exports = UserApiService;
