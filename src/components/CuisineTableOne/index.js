import React from 'react';
import { Table, Tag, Button, Badge, Divider } from 'antd';
import WrappedOrderForm from './CuisineTableOneFilter';
import { withRouter } from "react-router";
import { connect } from 'dva'
import { routerRedux } from 'dva/router';


import './index.less'


const tabColumns = [
  {
    title: '名称',
    dataIndex: 'foodName',
    key: 'foodName',
  },
  {
    title: '类别',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '别名',
    dataIndex: 'otherName',
    key: 'otherName',
  },
  {
    title: '食材明细',
    dataIndex: 'foodDetailStr',
    key: 'foodDetailStr',
  },
  {
    title: '操作',
    dataIndex: 'status',
    key: 'status',
    render(status) {
      return  <span><a>操作</a> <Divider type="vertical" /><a>删除</a></span>
    }
  }
];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};

class TableOne extends React.Component {
  handleNew = () => {
    this.props.history.push('/supermarket/new')
  }

  queryMy = () => {
    const { dispatch } = this.props
    dispatch({
      type:'management/queryMy'
    })
  }

  componentDidMount() {
    this.queryMy()
  }
  handleLinkChange(key,status) {   //table表格页面套装
    const { props } = this
    props.dispatch(routerRedux.push({ 
      pathname: '/supermarket/details',
      params: key,
    }))
  }

  render() {
    const { management } = this.props
    const dataSource = management.my.records 

    return (
      <div className='orderTable'>
        <WrappedOrderForm />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <Button type='primary' icon="plus" onClick={this.handleNew}>新建</Button>
            <Button style={{marginLeft:10}}>删除</Button>
          </div>
        </div>
        <div style={{ marginTop: 30 }}>
          <Table columns={tabColumns} dataSource={dataSource}  rowSelection={rowSelection} rowKey='id' onRow={(record) => {
            return {
              onClick: () => {
                this.handleLinkChange(
                  record.id,
                )
              }
            }
          }}  />
        </div>
      </div>
    )
  }
}

const CuisineTableOne = withRouter(TableOne);

export default connect(({management}) => ({management}))(CuisineTableOne)

