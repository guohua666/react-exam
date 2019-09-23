/*
 * @Author: jiaze 
 * @Date: 2019-09-03 10:41:49 
 * @Last Modified by: jiaze
 * @Last Modified time: 2019-09-08 13:40:00
 */

const siderBar = [{
        id: 'sub1',
        icon: 'sliders',
        name: '试题管理',
        isShow:false,
        children: [{
                id: '1',
                path: '/main/addQuestions',
                name: '添加试题',
                isShow:false,
            },
            {
                id: '2',
                path: '/main/questionsType',
                name: '试题分类',
                isShow:false,
            },
            {
                id: '3',
                path: '/main/watchQuestions',
                name: '查看试题',
                isShow:false,
            }
        ]
    },
    {
        id: 'sub2',
        icon: 'user',
        name: '用户管理',
        isShow:false,
        children: [{
                id: '4',
                path: '/main/addUser',
                name: '添加用户',
                isShow:false,
            },
            {
                id: '5',
                path: '/main/showUser',
                name: '用户展示',
                isShow:false,
            }
        ]
    },
    {
        id: 'sub3',
        icon: 'schedule',
        name: '考试管理',
        isShow:false,
        children: [{
                id: '6',
                path: '/main/addExam',
                name: '添加考试',
                isShow:false,
            },
            {
                id: '7',
                path: '/main/exam',
                name: '试卷列表',
                isShow:false,
            }
        ]
    },
    {
        id: 'sub4',
        icon: 'project',
        name: '班级管理',
        isShow:false,
        children: [{
                id: '8',
                path: '/main/grade',
                name: '班级管理',
                isShow:false,
            },
            {
                id: '9',
                path: '/main/room',
                name: '教室管理',
                isShow:false,
            },
            {
                id: '10',
                path: '/main/student',
                name: '学生管理',
                isShow:false,
            }
        ]
    },
    {
        id: 'sub5',
        icon: 'project',
        name: '阅卷管理',
        isShow:false,
        children: [{
            id: '11',
            path: '/main/paper',
            name: '待批班级',
            isShow:false,
        }]
    }
];
export default siderBar;