/*
 * @Author: zgh 
 * @Date: 2019-09-06 21:30:03 
 * @Last Modified by: jiaze
 * @Last Modified time: 2019-09-15 22:57:06
 */


import React, { Component } from 'react';
import {
    Layout,
    Tooltip,
    Tag,
    Icon,
    Breadcrumb,
    Button,
    Select,
    List,
    message,
} from 'antd';
import question from '@/api/question';
import InfiniteScroll from 'react-infinite-scroller';

const { Content } = Layout;
const { Option } = Select;

class Question extends Component {
    state = {
        topictype: [],
        subjectType: [],
        examtype: [],
        topicType: [],
        select_exam: '',
        select_topic: '',
        size: 'large',
        data: [],
        hasMore: true,
        id: 0
    };
    render() {
        const {
            subjectType,
            topicType,
            examtype,
        } = this.state;
        return (
            <Layout
                style={{
                    padding: '0 24px 24px',
                    height: 'auto',
                    width: '1000px'
                }}
            >
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>
                        <h3>查看试题</h3>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <Content
                    style={{
                        background: '#fff',
                        padding: 24,
                        margin: 0,
                        minHeight: 300
                    }}>
                    <div>
                        <Tooltip title='prompt text' >
                            <span> 课程类型：</span>
                        </Tooltip>

                        {subjectType &&
                            subjectType.map(item => (
                                <Button
                                    style={{
                                        marginLeft: '10px',
                                        fontSize: '12px',
                                        marginTop: '5px'
                                    }}
                                    key={item.id}
                                    onClick={() => {
                                        this.setState({
                                            id: item.id,
                                        })
                                    }}>
                                    {item.subject_name}
                                </Button>
                            ))}


                        <div style={{ margin: '20px 0' }}>
                            <span style={{ marginRight: '20px' }}>
                                <Tooltip title='prompt text'>
                                    <span> 考试类型:</span>
                                </Tooltip>
                                <Select
                                    defaultValue='请选择'
                                    style={{ width: 120 }}
                                    onChange={value => {
                                        this.setState({
                                            select_exam: value
                                        });

                                    }}>
                                    {examtype && examtype.map((item, index) => (
                                        <Option
                                            value={item.text}
                                            key={index}>
                                            {item.text}
                                        </Option>
                                    ))}
                                </Select>
                            </span>
                            <span >
                                <Tooltip title='prompt text'>
                                    <span> 题目类型: </span>
                                </Tooltip>
                                <Select
                                    defaultValue='请选择'
                                    style={{ width: 120 }}
                                    onChange={value => {
                                        this.setState({

                                            select_topic: value
                                        });
                                    }}>
                                    {topicType &&
                                        topicType.map((item, index) => (
                                            <Option
                                                value={item.typename}
                                                key={index}>
                                                {item.typename}
                                            </Option>
                                        ))}
                                </Select>
                            </span>
                            <span style={{ marginLeft: '20px' }}>
                                <Button type="primary" icon="search" onClick={this.getlist}>
                                    查询
                                </Button>
                            </span>
                        </div>
                        <ul>
                            {
                                this.state.data && this.state.data.map((item, index) => 
                                <li style={{ display: 'flex', borderBottom: '1px solid #eee' }} key={index}>
                                    <div style={{ flex: 9 }}>
                                        <div style={{ padding: '5px' }}>{item.question_name}</div>
                                        <div style={{ padding: '5px' }}>
                                            <Tag color="volcano">{item.question_type}</Tag>
                                            <Tag color="orange">{item.question_class_type}</Tag>
                                            <Tag color="gold">{item.question_exam_type}</Tag>
                                        </div>
                                        <div style={{ padding: '5px', color: '#108ee9' }}>dingshaoshan 发布</div>
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <Button type="link" size={this.state.size} onClick={this.detailquestion}>
                                            编辑

                                        </Button>
                                    </div>
                                </li>)
                            }
                        </ul>
                    </div>
                </Content>
            </Layout >
        );
    }
    handleInfiniteOnLoad = () => {
        let { data } = this.state;
        this.setState({
            loading: true,
        });
        if (data.length > 14) {
            message.warning('Infinite List loaded all');
            this.setState({
                hasMore: false,
                loading: false,
            });
            return;
        }
        this.fetchData(res => {
            data = data.concat(res.results);
            this.setState({
                data,
                loading: false,
            });
        });
    };

    detailquestion = () => {
        let { data } = this.state;
        this.props.history.push({
            pathname: '/main/detai',
            query: data
        });
    }
    getlist = () => {

        let { select_exam, select_topic, id } = this.state;
        question.findquestion({ select_exam, select_topic, id }).then(res => {
            let { code, msg, result } = res.data;
            if (code) {
                message.success(msg)
                this.setState({
                    data: result
                })
            }
            else {
                message.error(msg);
            }
        });
    }
    componentDidMount() {
        /**
         * 获取试题数据
         */
        question.getquestion().then(res => {
            this.setState({
                data: res.data.result,
            });
        })
        /**
        * 获取考试类型数据
        */
        question.exam_type().then(res => {
            this.setState({
                examtype: res.data.result
            })
        })
        /**
         * 获取课程类型数据
         */
        question.subject_type().then(res => {
            this.setState({
                subjectType: res.data.result
            });
        });
        /**
         * 获取题目类型数据
         */
        question.topic_type().then(res => {
            this.setState({
                topicType: res.data.result
            });
        });
    }
}
export default Question;
