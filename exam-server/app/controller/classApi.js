/*
 * @Author: zgh 
 * @Date: 2019-09-03 21:13:46 
 * @Last Modified by: jiaze
 * @Last Modified time: 2019-09-09 08:04:28
 */

const {Controller}=require('egg')

class api extends Controller {
    async remove(ctx){
        const {params} = ctx.request.body
        const user=await ctx.service.classApi.Sremove(params)
       ctx.body={
           code:1
       }
    }
    async add(ctx){
         const {name,kcname,jsname} = ctx.request.body
        const user=await ctx.service.classApi.Sadd(name,kcname,jsname)
       ctx.body={
           code:1
       }
    }
}
module.exports=api