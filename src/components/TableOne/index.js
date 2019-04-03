import React from 'react';
import { Table, Tag,  Button, Radio, Badge, Divider } from 'antd';
import WrappedOrderForm from './TableOneFilter';

import './index.less'


const tabColumns = [
  {
    title: '菜单编号',
    dataIndex: 'purchase',
    key: 'purchase',
  },
  {
    title: '有效时间',
    dataIndex: 'ResultSource',
    key: 'ResultSource',
  },
  {
    title: '餐饮单位',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: '下达时间',
    dataIndex: 'subtract',
    key: 'subtract',
  },
  {
    title: '操作',
    dataIndex: 'status',
    key: 'Status',
    render(status) {
      return status == 1 ? <div className='opertion'>
        <a className='orders' href='/details'>下单</a> <Divider type="vertical" /> <a className='delete'>删除</a>
      </div> : <a className='acceptance'>查看执行情况</a>
    }
  }
];

const dataSource = [
  {
    purchase:'83275042875023',
    ResultSource:'2018-12-01 至 2018-12-07第25周',
    date:'横店中心小学等6个单位',
    subtract:'2018-11-24',
    status:'0'
  },
  {
    purchase:'83275042875023',
    ResultSource:'2018-12-01 至 2018-12-07第25周',
    date:'横店中心小学等6个单位',
    subtract:'2018-11-24',
    status:'1'
  }
]

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};

class OrderTableOne extends React.Component {

  render() {
    return (
      <div className='orderTable'>
        <WrappedOrderForm />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <Button type='primary' icon="plus">新建菜单</Button>
            <Button style={{marginLeft:10}}>生成定价单</Button>
          </div>
        </div>
        <div style={{ marginTop: 30 }}>
          <Table columns={tabColumns} rowSelection={rowSelection} dataSource={dataSource}/>
        </div>
      </div>
    )
  }
}

export default OrderTableOne