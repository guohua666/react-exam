/*
 * @Author: jiaze 
 * @Date: 2019-09-03 15:42:45 
 * @Last Modified by:   jiaze 
 * @Last Modified time: 2019-09-03 15:42:45 
 */

const md5 = require('md5');

module.exports.createToken = id => {
    const token = JSON.stringify({
        time: +new Date(),
        id
    })
    return md5(token);
}