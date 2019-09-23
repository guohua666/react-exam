/*
 * @Author: zgh 
 * @Date: 2019-09-06 20:35:33 
 * @Last Modified by: zhujiahui
 * @Last Modified time: 2019-09-09 12:00:20
 * 试题管理的接口
 */

import request from "@/util/request";

let api = {
    exam_type: () => request.get('/exam/examtype'),
    subject_type: () => request.get('/subject/type'),
    topic_type: () => request.get('/topic/type'),
    addquestion: (obj) => request.post('/question/addquestion', obj),
    addquestiontype: (obj) => request.post('/question/addquestiontype', obj),
    getquestion: () => request.get('/question/questionList'),
    findquestion: (obj) => request.post('/question/findquestion', obj),
    newquestion: (obj) => request.post('/question/detail', obj),


}
export default api