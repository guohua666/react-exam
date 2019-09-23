/*
 * @Author: zgh 
 * @Date: 2019-09-03 21:13:53 
 * @Last Modified by:   zgh 
 * @Last Modified time: 2019-09-03 21:13:53 
 */

const Service = require('egg').Service;

class UserService extends Service {
    //验证用户名
    async Sremove(id) {
        const result = await this.app.mysql.delete('grade', {
            id: id
        });
        return result;
    }
    async Sadd(name, kcname, jsname) {
        const key = new Date() * 1;
        const result = await this.app.mysql.insert('grade', {
            class: `${name}`,
            courseName: `${kcname}`,
            classroomnumber: `${jsname}`,
            key: `${key}`,
            options: '操作'
        });
        return result;
    }
}
module.exports = UserService;
