import React from 'react';
import { Table, Tag, Tabs, Button, Radio, Badge, Divider } from 'antd';
import WrappedOrderForm from './OrderFilter';
import TotalNumber from '../TotalNumber';


import './index.less'

const DataSource = [
  {
    purchase:'整鸡(百年栗园/有机/老母鸡/1.25kg)',
    ResultSource:'斤',
    classify:'肉禽类',
    subtract:'28',
    date:'2018-11-12'
  },
  {
    purchase:'整鸡(百年栗园/有机/老母鸡/1.25kg)',
    ResultSource:'斤',
    classify:'肉禽类',
    subtract:'28',
    date:'2018-11-12'
  },
  {
    purchase:'整鸡(百年栗园/有机/老母鸡/1.25kg)',
    ResultSource:'斤',
    classify:'肉禽类',
    subtract:'28',
    date:'2018-11-12'
  },
  {
    purchase:'整鸡(百年栗园/有机/老母鸡/1.25kg)',
    ResultSource:'斤',
    classify:'肉禽类',
    subtract:'28',
    date:'2018-11-12'
  },
]

const tabColumns = [
  {
    title: '食材名称',
    dataIndex: 'purchase',
    key: 'purchase',
  },
  {
    title: '计量单位',
    dataIndex: 'ResultSource',
    key: 'ResultSource',
  },
  {
    title: '分类',
    dataIndex: 'classify',
    key: 'classify',
  },
  {
    title: '价格(元)',
    dataIndex: 'subtract',
    key: 'subtract',
  },
  {
    title: '最新定价时间',
    dataIndex: 'date',
    key: 'date'
  },
  {
    title: '操作',
    key: 'Status',
    render(status) {
      return <a>移出</a>
    }
  }
];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  }
};

class OrderTableThree extends React.Component {
  state = {
    DataSource: [],
    tableSource: []
  }


  render() {
    return (
      <div className='orderTable'>
        <WrappedOrderForm />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <Button style={{marginRight:'10px'}}>移出</Button>
            <Button>导出</Button>
          </div>
          <div>
            <TotalNumber value={`共4条`} />
            <Radio.Group defaultValue="all"  >
              <Radio.Button value="noOrder" >食材</Radio.Button>
              <Radio.Button value="ordered">辅料</Radio.Button>
            </Radio.Group>
          </div>
        </div>
        <div style={{ marginTop: 30 }}>
          <Table columns={tabColumns}  rowSelection={rowSelection} dataSource={DataSource} />
        </div>
      </div>
    )
  }
}

export default OrderTableThree