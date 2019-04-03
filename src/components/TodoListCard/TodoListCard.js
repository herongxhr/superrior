import React, { Component } from 'react';
import './TodoListCard.less';
import {  Table } from 'antd';
import { Badge } from 'antd';

const columns = [{
    title: '待办事项',
    dataIndex: 'todolist',
    key: 'todolist',
  }, {
    dataIndex: 'count',
    key: 'count',
    align: 'right',
    className: 'all',
    render: count => (
      <span>
        <Badge count={count} style={{ backgroundColor: '#FF9500', boxShadow: '0 0 0 1px #d9d9d9 inset' }} />
      </span>
    ), 
  }];

  const data = [{
    key: '1',
    todolist: '待执行订单',
    count: '2',
  }, {
    key: '2',
    todolist: '换货审核',
    count: '1',
  }, {
    key: '3',
    todolist: '待下单',
    count: '3',
  },{
    key: '4',
    todolist: '待验收',
    count: '6',
  }];
class TodoListCard extends Component {
  render() {
    return (
      <div className="TodoListCard">
        <Table columns={columns} dataSource={data} pagination={false}/>
      </div>
    );
  }
}

export default TodoListCard;