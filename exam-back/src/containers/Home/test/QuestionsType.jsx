/*
 * @Author: zgh
 * @Date: 2019-09-03 21:14:08
 * @Last Modified by: jiaze
 * @Last Modified time: 2019-09-10 09:24:47
 */

import question from '@/api/question';
import React, { Component } from 'react';
import {
    Layout,
    message,
    Table,
    Modal,
    Icon,
    Breadcrumb,
    Input,
    Button
} from 'antd';

const { Content } = Layout;
const columns = [
    {
        title: '类型ID',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: '类型名称',
        dataIndex: 'age',
        key: 'age'
    }
];

class QuestionsType extends Component {
    state = {
        collapsed: false,
        topictype: [],
        ModalText: '确定',
        visible: false,
        confirmLoading: false,
        data: []
    };
    onCollapse = collapsed => {
        this.setState({ collapsed });
    };
    showModal = () => {
        this.setState({
            visible: true
        });
    };
    Changevalue = e => {
        this.setState({
            val: e.target.value
        });
    };
    /**
     *添加题目类型
     *
     * @memberof val
     */
    handleOk = () => {
        this.setState({
            ModalText: '确定',
            confirmLoading: true
        });
        let { val, data } = this.state;
        question.addquestiontype({ val }).then(res => {
            let { code, msg } = res.data;
            if (code) {
                message.success(msg);
                data.push({
                    key: data.length + 1,
                    name: data.length + 1,
                    age: val,
                });
                this.setState({
                    data
                });
            } else {
                message.error(msg);
            }
        });
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false
            });
        }, 2000);
    };

    handleCancel = () => {
        this.setState({
            visible: false
        });
    };
    render() {
        const { visible, confirmLoading, data, val } = this.state;
        return (
            <Layout
                style={{
                    padding: '0 24px 24px',
                    height: 'auto',
                    width: '1000px'
                }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>
                        <h3>添加试题</h3>
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
                        <Button type='primary' onClick={this.showModal}>
                            <Icon type='plus' /> 添加类型
                        </Button>
                        <Modal
                            title='创建新类型'
                            visible={visible}
                            onOk={this.handleOk}
                            confirmLoading={confirmLoading}
                            onCancel={this.handleCancel}>
                            <Input
                                placeholder='请输入类型名称'
                                value={val}
                                onChange={this.Changevalue}
                            />
                        </Modal>
                    </div>
                    <Table columns={columns} dataSource={data} />
                </Content>
            </Layout>
        );
    }
    componentDidMount() {
        /**
         * 获取题目类型数据
         */
        let { data } = this.state;
        question.topic_type().then(res => {
            res.data.result.map((item, index) => {
                data.push({
                    key: item.id,
                    name: item.id,
                    age: item.typename,
                    address: ''
                });
                return data;
            });
            this.setState({
                data
            });
        });
    }
}

export default QuestionsType;
