import React from 'react';
import { Table, Tag, Button , Divider, Input  } from 'antd';
import { connect } from 'dva'

import './index.less'

const Search = Input.Search;

const tabColumns = [
  {
    title: '食材名称',
    dataIndex: 'goodsName',
    key: 'goodsName',
  },
  {
    title: '使用单位',
    dataIndex: 'cateringName',
    key: 'cateringName',
  },
  {
    title: '价格(元)',
    dataIndex: 'price',
    key: 'price',
    render(text) {
      return <a>{text}</a>
    }
  },
  {
    title: '操作',
    key: 'operation',
    render(text) {
      return <span><a>收录</a><Divider type="vertical" /><a>删除</a></span>
    }
  }
];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  }
};

class OrderTableTwo extends React.Component {

  queryWaitCollect = () => {
    const { dispatch } = this.props
    dispatch({
      type:'purOrder/queryWaitCollect'
    })
  }

  componentDidMount() {
    this.queryWaitCollect()
  }


  render() {
    const { purOrder } = this.props
    let dataSource = purOrder.WaitCollect.records
    if(dataSource) {
      dataSource.forEach(item=> item.goodsName = item.goodsName + item.spec )
    }
    return (
      <div className='orderTable'>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <Button type='primary' style={{ marginLeft:20,marginRight:10 }}>收录</Button>
            <Button>删除</Button>
            {/* <Button style={{marginLeft:'10px'}}>导出</Button> */}
          </div>
          <div>
            <Search
              placeholder='请输入关键字进行搜索'
              onSearch={value => console.log(value)}
              style={{ width:300,height:32 }}
            />
          </div>
        </div>
        <div style={{ marginTop: 30 }}>
          <Table columns={tabColumns}  dataSource={dataSource} rowKey='ordDetailId' rowSelection={rowSelection} />
        </div>
      </div>
    )
  }
}

export default connect(({purOrder}) => ({purOrder}))(OrderTableTwo)
