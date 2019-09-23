/*
 * @Author: jiaze 
 * @Date: 2019-09-03 15:39:48 
 * @Last Modified by: jiaze
 * @Last Modified time: 2019-09-08 22:03:56
 */

"use strict";

const Service = require("egg").Service;

class UserService extends Service {
  /**
   * @name 验证用户名
   * @param {*} username 
   */
  async loginUsername(username) {
    let result = await this.app.mysql.get("user", {
      username
    });
    return result;
  }
  /**
   * @name 验证密码
   * @param {*} password 
   */
  async loginPassword(username,password) {
    let result = await this.app.mysql.get("user", {
      username,
      password
    });
    return result;
  }
  /**
   * @name 保存token
   * @param {*} id 
   * @param {*} token 
   */
  async setToken(id, token) {
    const $sql = `update user set token=? where id=?`;
    const result = await this.app.mysql.query($sql, [token, id]);
    return result;
  }
  /**
   * @name 更新用户数据
   * @param {*} obj 
   */
  async updateUser(obj) {
    const {
      id,
      username,
      password,
      type
    } = obj;
    const $sql = `update user set username=?,password=?,type=? where id=?`;
    const result = await this.app.mysql.query($sql, [
      username,
      password,
      type,
      id
    ]);
    return result;
  }

}

module.exports = UserService;