
const Service = require('egg').Service;

class UserService extends Service {
    async getSubject() {
        const result = await this.app.mysql.select('subject');
        return result;
    }
    async getRoom() {
        let $sql=`select * from room where room.room_name not in (select classroomnumber from grade)`
        const result = await this.app.mysql.query($sql);
        return result;
    }
    async getRoomList() {
        const result = await this.app.mysql.select('room');
        return result;
    }
    async getClass() {
        const result = await this.app.mysql.select('grade');
        return result;
    }
    async addBanClass() {
        const {ban,room,subject}=this.ctx.request.body;
        const checkAdd=await this.app.mysql.get('grade',{class:ban});
        if(checkAdd){
            return 'no'
        }else{
            const result = await this.app.mysql.insert('grade', {class:ban,classroomnumber:room,courseName:subject});
            return result;
        }
    }
    async delGrade() {
        const {id}=this.ctx.request.body;
        const result = await this.app.mysql.delete('grade', {
            id: id,
          });
        return result;
    }
    async updateGrade() {
       const {ban,room,subject}= this.ctx.request.body;
        const row = {
            class:ban,
            classroomnumber:room,
            courseName:subject
          };
          
          const options = {
            where: {
                class:ban,
            }
          };
        const result = await this.app.mysql.update('grade', row, options)
        return result;
    }
    async addRoom() {
        const {room}=this.ctx.request.body;
        const result = await this.app.mysql.insert('room', {room_name:room});
        return result;
    }
    async delRoom() {
        const {room}=this.ctx.request.body;
        const result = await this.app.mysql.delete('room', {room_name:room});
        return result;
    }
    async serchStudent() {
        const {name,room,banji}=this.ctx.request.body;
        let $sql=`SELECT * FROM student WHERE ${room!=undefined?'classroom LIKE '+room+' AND ':''}${banji!=undefined?'class_number LIKE "'+banji+'" AND ':''}name LIKE '%${name?name:""}%'`
        const result = await this.app.mysql.query($sql);
        return result;
    }
    async delStudent() {
        const {name,id}=this.ctx.request.body;
        const result = await this.app.mysql.delete('student', {name,id});
        return result;
    }
    /**
   * @name 学生管理请求数据
   */
  async Datastudent() {
    const $sql = `select * from student`;
    const result = await this.app.mysql.query($sql);
    return result;
  }
   /**
   * @name 教室管理请求数据
   */
  async Dataclassnumber() {
    const $sql = `select * from classnumber`;
    const result = await this.app.mysql.query($sql);
    return result;
  }
  /**
   * @name 班级管理请求数据
   */
  async Datagrade() {
    const $sql = `select * from grade`;
    const result = await this.app.mysql.query($sql);
    return result;
  }
}
module.exports = UserService;
