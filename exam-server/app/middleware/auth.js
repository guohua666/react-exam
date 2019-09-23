/*
 * @Author: jiaze 
 * @Date: 2019-09-03 15:39:27 
 * @Last Modified by:   jiaze 
 * @Last Modified time: 2019-09-03 15:39:27 
 */

module.exports = (opt, app) => {
    return async function auth(ctx, next) {
        const {
            token,
            id
        } = ctx.request.header;
        if (!token) {
            ctx.status = 401;
            ctx.body = {
                code: 0,
                msg: '没有权限，缺少参数token'
            }
        } else if (!id) {
            ctx.status = 401;
            ctx.body = {
                code: 0,
                msg: '没有权限，缺少参数id'
            }
        } else {
            const result = await ctx.service.user.getID(id);
            if (result[0].token == token) {
                await next();
            } else {
                ctx.body = {
                    code: 0,
                    msg: '没有权限'
                }
            }
        }
    }
}