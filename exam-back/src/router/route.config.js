/*
 * @Author: jiaze 
 * @Date: 2019-09-03 15:08:21 
 * @Last Modified by: jiaze
 * @Last Modified time: 2019-09-15 22:50:03
 */

import Home from '@/containers/Home';
import Login from '@/containers/Login';
import Exam from '@/containers/Home/exam/Exam';
import Room from '@/containers/Home/grade/Room';
import Paper from '@/containers/Home/paper/Paper';
import Grade from '@/containers/Home/grade/Grade';
import AddExam from '@/containers/Home/exam/AddExam';
import AddUser from '@/containers/Home/user/addUser';
import Student from '@/containers/Home/grade/Student';
import ShowUser from '@/containers/Home/user/showUser';
import AddHeadImg from '@/containers/Home/user/AddHeadImg';
import AddQuestions from '@/containers/Home/test/AddQuestions';
import QuestionsType from '@/containers/Home/test/QuestionsType';
import WatchQuestions from '@/containers/Home/test/WatchQuestions';
import Detail from '@/containers/Home/test/detail';
import DetailTest from '../containers/Home/detail/DetailTest';

const route = [{
        path: '/login',
        component: Login
    },
    {
        path: '/main',
        component: Home,
        children: [{
                path: '/main/addQuestions',
                component: AddQuestions
            },
            {
                path: '/main/detail/:id',
                component: DetailTest
            },
            {
                path: '/main/questionsType',
                component: QuestionsType
            },
            {
                path: '/main/watchQuestions',
                component: WatchQuestions
            },
            {
                path: '/main/detai',
                component: Detail
            },
            {
                path: '/main/addUser',
                component: AddUser
            },
            {
                path: '/main/showUser',
                component: ShowUser
            },
            {
                path: '/main/addExam',
                component: AddExam
            },
            {
                path: '/main/exam',
                component: Exam
            },
            {
                path: '/main/grade',
                component: Grade
            },
            {
                path: '/main/room',
                component: Room
            },
            {
                path: '/main/student',
                component: Student
            },
            {
                path: '/main/paper',
                component: Paper
            },
            {
                path: '/main/addHeadImg',
                component: AddHeadImg
            },
        ]
    },
    {
        from: '/',
        to: '/login'
    }
];

export default route;