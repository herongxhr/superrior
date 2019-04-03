import React from 'react';
import { Table, Tag,  Button, Radio, Badge, Divider, Statistic } from 'antd';
import WrappedOrderForm from './CuisineTableTwoFilter';
import TotalNumber from '../TotalNumber';

import './index.less'


const tabColumns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '类别',
    dataIndex: 'ResultSource',
    key: 'ResultSource',
  },
  {
    title: '别名',
    dataIndex: 'otherName',
    key: 'otherName',
  },
  {
    title: '食材明细',
    dataIndex: 'subtract',
    key: 'subtract',
  },
];

const dataSource = 
  [{
    name:'番茄炒蛋',
    ResultSource:'素菜',
    otherName:'西红柿炒蛋',
    subtract:'番茄名称名称名称20g / 鸡蛋名称名称30g / 什么名称名称16克',
    },
    {
    name:'番茄炒蛋',
    ResultSource:'素菜',
    otherName:'西红柿炒蛋',
    subtract:'番茄名称名称名称20g / 鸡蛋名称名称30g / 什么名称名称16克',
    },
    {
    name:'番茄炒蛋',
    ResultSource:'素菜',
    otherName:'西红柿炒蛋',
    subtract:'番茄名称名称名称20g / 鸡蛋名称名称30g / 什么名称名称16克',
    },
    {
    name:'番茄炒蛋',
    ResultSource:'素菜',
    otherName:'西红柿炒蛋',
    subtract:'番茄名称名称名称20g / 鸡蛋名称名称30g / 什么名称名称16克',
    },
  ]

class CuisineTableOne extends React.Component {

  render() {
    return (
      <div className='orderTable'>
        <WrappedOrderForm />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            {/* <Button type='primary' icon="plus">新建</Button>
            <Button style={{marginLeft:10}}>删除</Button> */}
            <TotalNumber value={`共4条`} />
          </div>
        </div>
        <div style={{ marginTop: 30 }}>
          <Table columns={tabColumns}  dataSource={dataSource} />
        </div>
      </div>
    )
  }
}

export default CuisineTableOne