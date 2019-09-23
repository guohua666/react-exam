/*
 * @Author: jiaze
 * @Date: 2019-09-03 11:53:14
 * @Last Modified by: xiaoyu
 * @Last Modified time: 2019-09-15 19:45:19
 */

import request from "@/util/request";

/**
 * @name 获取用户身份类型
 */
export function identityId() {
	return request.post('/user/identityId');
}
/**
 * @name 添加用户
 * @param {*} params 用户的名称、密码、身份
 */
export function addUser(params) {
	return request.post('/user/addUser', params);
}
/**
 * @name 更新用户
 * @param @param {*} params 用户的id、名称、密码、身份
 */
export function updateUser(params) {
	return request.post('/user/updateUser', params);
}
/**
 * @name 获取所有用户信息
 */
export function getUserList() {
	return request.get('/user/userInfo');
}
/**
 * @name 添加api接口权限
 */
export function addApi(params) {
	return request.post('/user/addApi', params);
}
/**
 * @name 查询用户身份类型
 */
export function userIdentity() {
	return request.get('/user/userIdentity');
}
/**
 * @name 查询api接口
 */
export function apiAuthority() {
	return request.get('/user/apiAuthority');
}
/**
 * @name 查询身份和api接口关系
 */
export function identityApiAuthority() {
	return request.get('/user/identityApiAuthority');
}
/**
 * @name 查询视图接口
 */
export function viewAuthority() {
	return request.get('/user/viewAuthority');
}
/**
 * @name 查询身份与视图接口关系
 */
export function identityViewAuthority(){
	return request.get('/user/identityViewAuthority')
}
/**
 * @name 身份返回视图
 */
export function identityView(id){
	return request.get('/user/identityView/'+id)
}
