import React from 'react';
import { Table, Button, Radio, Badge, Divider } from 'antd';
import WrappedOrderForm from './OrderFilterOne';
import { connect } from 'dva'
import { routerRedux } from 'dva/router';
import TotalNumber from '../TotalNumber';


import './index.less'


const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  }
};

class OrderTableOne extends React.Component {

  handlePublish = (key) => {   //发布按钮
    const { dispatch } = this.props
    dispatch({
			type:'purOrder/queryPurchasePublish',
			payload:{id:key}
    })
    window.location.reload()
  }

  handleDelete = (key) => {  //删除按钮
    const { dispatch } = this.props
    dispatch({
			type:'purOrder/queryPurchaseDelete',
			payload:{id:key}
    })
  }

  queryPurOrder = () => {   //全部请求函数
    const { dispatch } = this.props
    dispatch({
      type:'purOrder/queryPurchasePrice'
    })
  }

  queryPurOrderUnpublished= (status) => {  //未发布请求函数
    const { dispatch } = this.props
    dispatch({
      type:'purOrder/queryPurchasePrice',
      payload:{
        status:0,
      }
    })
    window.location.reload()
  }

  queryPurOrderPublished = (status) => {  //已发布请求函数
    const { dispatch } = this.props
    dispatch({
      type:'purOrder/queryPurchasePrice',
      payload:{
        status:1,
      }
    })
    window.location.reload()
  }

  RadiosOnChange = (e) =>  {
    if(e.target.value == 'all') {
      this.queryPurOrder()
    }
    if(e.target.value == 'ordered') {
      this.queryPurOrderUnpublished()
    }
    if(e.target.value == 'noOrder') {
      this.queryPurOrderPublished()
    }
  }

  componentDidMount() {
    this.queryPurOrder() 
  }

  handleLinkChange(key,status) {   //table表格页面套装
    const { props } = this
    props.dispatch(routerRedux.push({ 
      pathname: '/pricedetail',
      params: key,
      status,
    }))
  }

  render() {
    var _this = this
    const tabColumns = [
      {
        title: '定价单号',
        dataIndex: 'priceListCode',
        key: 'priceListCode',
        render(text) {
          return <a>{text}</a>
        }
      },
      {
        title: '食材数量',
        dataIndex: 'priceListCount',
        key: 'priceListCount',
      },
      {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
      },
      {
        title: '发布时间',
        dataIndex: 'ptime',
        key: 'ptime',
        render(ptime,record) {
          return ptime == '' ? <span><Badge status="warning" />未发布</span> : <span>{ptime}</span>
        }
      },
      {
        title: '操作',
        dataIndex: 'status',
        key: 'status',
        render(text,record) {
          return text == 1 ? '' : <span><a style={{color:'orange'}} onClick={() => _this.handlePublish(record.id)}>发布</a><Divider type="vertical" /><a style={{color:'blue'}} onClick={() => _this.handleDelete(record.id)}>删除</a></span>
        }
      }
    ];
    const { purOrder } = this.props
    const dataSource = purOrder.purchasePrice.records
    const length = dataSource ? dataSource.length : null
    return (
      <div className='orderTable'>
        <WrappedOrderForm />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <Button type='primary' icon="plus">新建</Button>
            <Button style={{marginLeft:10}}>导出</Button>
          </div>
          <div>
            <TotalNumber value={`共${length}条`} />
            <Radio.Group defaultValue="all" onChange={this.RadiosOnChange}>
              <Radio.Button value="all">全部</Radio.Button>
              <Radio.Button value="noOrder">已发布</Radio.Button>
              <Radio.Button value="ordered">未发布</Radio.Button>
            </Radio.Group>
          </div>
        </div>
        <div style={{ marginTop: 30 }}>
          <Table columns={tabColumns} dataSource={dataSource} rowKey='id' rowSelection={rowSelection} onRow={(record) => {
            return {
              onClick: () => {
                this.handleLinkChange(
                  record.id,
                  record.status,
                )
              }
            }
          }} />
        </div>
      </div>
    )
  }
}

export default connect(({purOrder}) => ({purOrder}))(OrderTableOne)
