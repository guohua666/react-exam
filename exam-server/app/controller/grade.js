const { Controller } = require('egg')

class gradeConcroller extends Controller {
    async getSubject(ctx) {
        const result = await ctx.service.grade.getSubject()
        ctx.body = {
            code: 1,
            result
        }
    }
    async getRoom(ctx) {
        const result = await ctx.service.grade.getRoom()
        ctx.body = {
            code: 1,
            result
        }
    }
    async getRoomList(ctx) {
        const result = await ctx.service.grade.getRoomList()
        ctx.body = {
            code: 1,
            result
        }
    }
    async getClass(ctx) {
        const result = await ctx.service.grade.getClass()
        ctx.body = {
            code: 1,
            result
        }
    }
    async addBanClass(ctx) {
        const result =await ctx.service.grade.addBanClass()
        ctx.body = {
            code: 1,
            result
        }
    }
    async delGrade(ctx) {
        await ctx.service.grade.delGrade()
        ctx.body = {
            code: 1
        }
    }
    async updateGrade(ctx) {
        await ctx.service.grade.updateGrade()
        ctx.body = {
            code: 1,
        }
    }
    async addRoom(ctx) {
        await ctx.service.grade.addRoom()
        ctx.body = {
            code: 1,
        }
    }
    async delRoom(ctx) {
        await ctx.service.grade.delRoom()
        ctx.body = {
            code: 1,
        }
    }
    async serchStudent(ctx) {
       const result= await ctx.service.grade.serchStudent()
        ctx.body = {
            code: 1,
            result
        }
    }
    async delStudent(ctx) {
        await ctx.service.grade.delStudent()
         ctx.body = {
             code: 1,
             msg:'删除成功'
         }
     }
     /**
	 * @name 学生管理
	 */
	async student() {
		const user = await this.ctx.service.grade.Datastudent();
		this.ctx.body = {
			code: 1,
			user
		};
	}
	/**
	 * @name 教室管理
	 */
	async classnumber() {
		const user = await this.ctx.service.grade.Dataclassnumber();
		this.ctx.body = {
			code: 1,
			user
		};
	}
	/**
	 * @name 班级管理
	 */
	async grade() {
		const user = await this.ctx.service.grade.Datagrade();
		this.ctx.body = {
			code: 1,
			user
		};
	}
}
module.exports = gradeConcroller