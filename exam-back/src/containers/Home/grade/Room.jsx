/*
 * @Author: xub 
 * @Date: 2019-09-08 23:33:09 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-09-12 09:15:20
 */
import "@/assets/css/grade/room.css";
import React from 'react';
import { addRoom, getRoomList, delRoom } from '@/api/classManage';
import { Modal, Button, Table, Popconfirm, message } from 'antd';

class App extends React.Component {
  state = {
    visible: false,
    value: "",
    roomList: []
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    let room = this.state.value;
    addRoom(room).then(res => {
      message.success('添加成功')
      getRoomList().then(res => {
        this.setState({
          roomList: res.data.result.map((item, index) => {
            item.key = index
            return item
          })
        })
      })
    }
    )
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };
  confirm = (rec) => {
    delRoom(rec.room_name).then(res => {
      getRoomList().then(res => {
        this.setState({
          roomList: res.data.result.map((item, index) => {
            item.key = index
            return item
          })
        })
      })
    })
    message.success('删除成功');
  }

  cancel = (e) => {
    message.error('取消删除');
  }
  componentDidMount() {
    getRoomList().then(res => {
      this.setState({
        roomList: res.data.result.map((item, index) => {
          item.key = index
          return item
        })
      })
    })
  }

  render() {
    const columns = [
      {
        title: '教室号',
        dataIndex: 'room_name',
        key: 'room_id',
      },
      {
        title: 'Action',
        key: 'action',
        render: (record) => (
          <span>
            < Popconfirm
              title="确定删除吗?"
              onConfirm={() => this.confirm(record)}
              onCancel={this.cancel}
              okText="Yes"
              cancelText="No"
            >
              <span className="cus" onClick={() => {
                
              }}>删除</span>
            </Popconfirm>
          </span >
        ),
      },
    ];

    return (
      <div className="roomManage">
        <Button type="primary" onClick={this.showModal} className="btn1">
          添加教室
        </Button>
        <Modal
          title="添加教室"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>教室号：<input
            style={{ border: "solid 1px #ccc", height: "30px", borderRadius: '3px', paddingLeft: "10px" }}
            type="text" placeholder="请输入教室号" value={this.state.value} onChange={(e) => {
              this.setState({
                value: e.currentTarget.value
              })
            }} /></p>
        </Modal>
        <Table columns={columns} dataSource={this.state.roomList} />
      </div>
    );
  }
}

export default App;