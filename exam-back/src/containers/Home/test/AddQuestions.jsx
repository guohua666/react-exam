/*
 * @Author: zgh
 * @Date: 2019-09-03 10:00:01
 * @Last Modified by: zhujiahui
 * @Last Modified time: 2019-09-09 20:16:57
 */

import Editor from 'for-editor';
import question from '@/api/question'
import React, { Component } from 'react';
import { Layout, message, Breadcrumb, Input, Select, Button } from 'antd';

const { Option } = Select;
const { Content } = Layout;

class AddQuestions extends Component {
    state = {
        collapsed: false,
        iptval: '',
        topic: '',
        answer: '',
        examtype: [],
        subjecttype: [],
        topictype: [],
        select_exam: '',
        select_subject: '',
        select_topic: '',
        username: ''
    };
    onCollapse = collapsed => {
        this.setState({ collapsed });
    };
    render() {
        let {
            iptval,
            topic,
            answer,
            examtype,
            subjecttype,
            topictype
        } = this.state;
        return <div>
            <Layout
                style={{
                    padding: '0 24px 24px',
                    height: 'auto',
                    width: '1000px'
                }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>添加试题</Breadcrumb.Item>
                </Breadcrumb>
                <Content
                    style={{
                        background: '#fff',
                        padding: 24,
                        margin: 0,
                        minHeight: 300
                    }}>
                    <div>题目信息</div>
                    <div style={{ margin: '20px 0' }}>题干</div>
                    <Input
                        placeholder='请输入题目信息，不超过20个字'
                        value={iptval}
                        onChange={e => {
                            this.setState({
                                iptval: e.target.value
                            });
                        }}
                    />
                    <div style={{ margin: '20px 0' }}> 题目主题</div>
                    <Editor
                        style={{ height: '300px' }}
                        value={topic}
                        onChange={e => {
                            this.setState({
                                topic: e
                            });
                        }}
                    />
                    <div style={{ margin: '20px 0' }}>请选择考试类型:</div>
                    <Select
                        defaultValue='请选择'
                        style={{ width: 120 }}
                        onChange={e => {
                            this.setState({
                                select_exam: e
                            });
                        }}>
                        {examtype && examtype.map((item, index) => (
                            <Option value={item.text} key={index}>
                                {item.text}
                            </Option>
                        ))}
                    </Select>
                    <div style={{ margin: '20px 0' }}>请选择课程类型：</div>
                    <Select
                        defaultValue='请选择：'
                        style={{ width: 120 }}
                        onChange={e => {
                            this.setState({
                                select_subject: e
                            });
                        }}>
                        {subjecttype &&
                            subjecttype.map((item, index) => (
                                <Option value={item.subject_name} key={index}>
                                    {item.subject_name}
                                </Option>
                            ))}
                    </Select>
                    <div style={{ margin: '20px 0' }}>请选择题目类型:</div>
                    <Select
                        defaultValue='请选择'
                        style={{ width: 120 }}
                        onChange={e => {
                            this.setState({
                                select_topic: e
                            });
                        }}>
                        {topictype &&
                            topictype.map((item, index) => (
                                <Option value={item.typename} key={item.id}>
                                    {item.typename}
                                </Option>
                            ))}
                    </Select>
                    <div style={{ margin: '20px 0' }}>答案信息</div>
                    <Editor
                        style={{ height: '300px' }}
                        value={answer}
                        onChange={e => {
                            this.setState({
                                answer: e
                            });
                        }}
                    />
                    <Button type='primary' onClick={this.submit}>
                        提交
                        </Button>
                </Content>
            </Layout>
        </div>
    }
    /**
    * 添加试题
    */
    submit = () => {
        let { iptval, topic, answer, select_exam, select_subject, select_topic, username } = this.state;
        username = window.sessionStorage.getItem('name')
        console.log(username)
        question.addquestion({ iptval, topic, answer, select_exam, select_subject, select_topic, username }).then(res => {
            let { code, msg } = res.data;
            if (code) {
                message.success(msg)
            }
            else {
                message.error(msg);
            }
        })
    }
    componentDidMount() {
        /**
         * 考试类型
         */
        question.exam_type().then(res => {
            this.setState({
                examtype: res.data.result
            })
        })
        /**
         * 课程类型
         */
        question.subject_type().then(res => {
            this.setState({
                subjecttype: res.data.result
            })
        })
        /**
         * 题目类型
         */
        question.topic_type().then(res => {
            this.setState({
                topictype: res.data.result
            })
        })
    }
}

export default AddQuestions;
