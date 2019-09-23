
const {whiteList} = require("../config");
const fs = require("fs");
const path=require("path");
module.exports=()=>{
    return async function Login(ctx,next){
        const inWhiteList=whiteList.filter(route=>{
            return route===ctx.request.url;
        })
        if(inWhiteList.length){
            await next();
            const filepath=path.join(process.cwd(),"app/public/static/index.html");
            const filedata=fs.readFileSync(filepath,"utf-8");
            ctx.body=filedata;
        }else{
            await next();
        }
    }
}