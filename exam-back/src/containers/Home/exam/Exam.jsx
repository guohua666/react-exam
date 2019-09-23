/*
 * @Author: xiaoyu 
 * @Date: 2019-09-03 15:56:20 
 * @Last Modified by: xiaoyu
 * @Last Modified time: 2019-09-15 19:26:22
 */

import 'antd/dist/antd.css';
import '@/assets/css/exam/exam.css';
import moment from 'moment';
import 'moment/locale/zh-cn';
import React, { Component } from 'react';
import { Select, Button, Table, message } from 'antd';
import { getTestList, getTestClass, getTestType, getDetailTest } from '@/api/exam';

moment.locale('zh-cn');
const { Option } = Select;


class Exam extends Component {
    state = {
        testType: '',
        testObject: '',
        data: [],
        allList: [],
        contList: [
            {
                id: 0,
                cont: '全部'
            },
            {
                id: 1,
                cont: '进行中'
            },
            {
                id: 2,
                cont: '已结束'
            }
        ],
        columns: [
            {
                title: '试卷信息',
                dataIndex: 'info',
                key: 'info',
            },
            {
                title: '班级',
                dataIndex: 'classtest',
                key: 'classtest',
            },
            {
                title: '创建人',
                dataIndex: 'createman',
                key: 'createman',
            },
            {
                title: '开始时间',
                dataIndex: 'startDate',
                key: 'startDate',
            },
            {
                title: '结束时间',
                dataIndex: 'endtDate',
                key: 'endtDate',
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => {
                    return <span>
                        <b onClick={() => this.handleDetail(record)}>详情</b>
                    </span>
                }
            }
        ],
        ind: 0
    };
    handleChange = (value) => {
        this.setState({
            testType: value
        })
    }
    handleObject = (value) => {
        this.setState({
            testObject: value
        })
    }
    handleSearch() {
        getTestType({
            testType: this.state.testType,
            testObject: this.state.testObject
        }).then(res => {
            const dataList = res.data.result.map(item => {
                item.startDate = moment(+item.startDate).format("YYYY-MM-DD HH:mm:ss");
                item.endtDate = moment(+item.endtDate).format("YYYY-MM-DD HH:mm:ss");
                return item;
            })
            this.setState({
                data: dataList
            })
        })
    }
    handleDetail(record) {
        getDetailTest({
            examtype: record.examtype,
            course: record.course
        }).then(res => {
            if (res.data.code) {
                const result_cont = res.data.result.slice(0, record.cont);
                const url = `/main/detail/${record.key}`;
                this.props.history.push({ pathname: url, state: { data: result_cont } })
                message.success(`${res.data.msg}`);
            } else {
                message.success(`${res.data.msg}`);
            }
        }).catch(error => {
            message.success(error);
        })
    }
    render() {
        const { testType, testObject, data, columns, contList, ind } = this.state;
        return (
            <div className="Exam">
                <h2 className="top">试卷列表</h2>
                <div className="center">
                    <span className="spans">考试类型：</span>
                    <Select defaultValue="周考一" style={{ width: 120 }} value={testType} onChange={this.handleChange}>
                        <Option value="周考一">周考一</Option>
                        <Option value="周考二">周考二</Option>
                        <Option value="周考三">周考三</Option>
                        <Option value="月考">月考</Option>
                    </Select>
                    <span className="spans">课程：</span>
                    <Select defaultValue="javaScript上" style={{ width: 120 }} value={testObject} onChange={this.handleObject}>
                        <Option value="javaScript上">javaScript上</Option>
                        <Option value="javaScript下">javaScript下</Option>
                        <Option value="模块化开发">模块化开发</Option>
                        <Option value="移动端开发">移动端开发</Option>
                        <Option value="node基础">node基础</Option>
                        <Option value="组件化开发(vue)">组件化开发(vue)</Option>
                        <Option value="渐进式开发(react)">渐进式开发(react)</Option>
                        <Option value="项目实战">项目实战</Option>
                        <Option value="javaScript高级">javaScript高级</Option>
                        <Option value="node高级">node高级</Option>
                    </Select>
                    <Button type="primary" icon="search" onClick={() => this.handleSearch()} className="exam-search">
                        搜索
              </Button>
                </div>
                <div className="bottom">
                    <p className="bottom-top">
                        <span>试卷列表</span>
                        {
                            contList.map(item => (
                                <b key={item.id} className={item.id === ind ? 'active' : ''} onClick={() => this.handleClick(item.id, item)}>{item.cont}</b>
                            ))
                        }
                    </p>
                    <div className="bottom-bottom">
                        <Table columns={columns} dataSource={data} />
                    </div>
                </div>
            </div>
        );
    }
    componentDidMount() {
        this._getTestList();

    }

    _getTestList() {
        getTestList().then(res => {
            const dataList = res.data.result.map(item => {
                item.startDate = moment(+item.startDate).format("YYYY-MM-DD HH:mm:ss");
                item.endtDate = moment(+item.endtDate).format("YYYY-MM-DD HH:mm:ss");
                return item;
            })
            this.setState({
                data: dataList,
                allList: dataList
            })
        })
    }

    handleClick(id, obj) {

        this.setState({
            ind: id
        })
        getTestClass(id).then(res => {
            const dataList = res.data.result.map(item => {
                item.startDate = moment(+item.startDate).format("YYYY-MM-DD HH:mm:ss");
                item.endtDate = moment(+item.endtDate).format("YYYY-MM-DD HH:mm:ss");
                return item;
            })
            this.setState({
                data: dataList
            })
            if (this.state.ind === 0) {
                this.setState({
                    data: this.state.allList
                })
            }

        })


    }

}

export default Exam;
