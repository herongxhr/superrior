import React from 'react'
import { Card , Table , Button , Row, Col , Radio , Input , Form } from 'antd'
import Bread from '../../components/Bread'
import { connect } from 'dva'

import './index.less'

var classNames = require('classnames');



const ButtonGroup = Button.Group;


class PriceDetail extends React.Component {
  dataDetail =  {}

  state = {
    showButton:false,
    btnGroup:true,
    data:[]
  }

  queryPriceDetail() {  //获取定价单编号的数据
    const { dispatch , location } = this.props
    dispatch({
      type:'purOrder/queryPriceDetail',
      payload: {
        id:location.params
      }
    })
  }

  queryPriceDetailPage() {  //获取食材明细的数据
    const { dispatch , location , purOrder} = this.props
    dispatch({
      type:'purOrder/queryPriceDetailPage',
      payload: {
        id:location.params
      }
    })
    this.dataDetail = purOrder.PriceDetailPage.records
  }

  handleAdjust = () => {  //调整使table的样式变化
    const { purOrder } = this.props
    purOrder.PriceDetailPage.records.forEach(item => item.editable = true)
    const { dispatch } = this.props
    dispatch({
      type:'purOrder/editPriceDetailPage',
      payload:{
        PriceDetailPage:purOrder.PriceDetailPage
      }
    })
    this.setState({
      btnGroup:false
    })
  }

  handleCancel = () => {
    const { purOrder , dispatch } = this.props
    purOrder.PriceDetailPage.records.forEach(item => item.editable = false)
    dispatch({
      type:'purOrder/editPriceDetailPage',
      payload:{
        PriceDetailPage:purOrder.PriceDetailPage
      }
    })
    this.setState({
      btnGroup:true      
    })
  }

  handleSave = () => {
    const { purOrder , dispatch } = this.props
    purOrder.PriceDetailPage.records = this.state.data
    purOrder.PriceDetailPage.records.forEach(item => item.editable = false)
    dispatch({
      type:'purOrder/editPriceDetailPage',
      payload:{
        PriceDetailPage:purOrder.PriceDetailPage
      }
    })
  }

  getRowByKey(key, newData) {  //取到改变的state的值
    const  data  = this.props.purOrder.PriceDetailPage.records;
    return (newData || data).filter(item => item.id === key)[0];
  }

  handleFieldChange(e, fieldName, key) {  //取出原data 赋值给 newData , 取到target ， target改变值 , 并重赋值data 
    console.log(this.dataDetail)
    const { purOrder , dispatch } = this.props
    const  data = purOrder.PriceDetailPage.records;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      target[fieldName] = e.target.value;
      // dispatch({
      //   type:'purOrder/editPriceDetailPage',
      //   payload:{
      //     PriceDetailPage:newData
      //   }
      // })
      console.log(target)
      console.log(newData)
      this.setState({
        data:newData
      })
    }
  }

  componentDidMount() {
    this.queryPriceDetail()
    this.queryPriceDetailPage()
  }

  render() {
    let orderArray = {
      '0': '菜单生成',
      '1': '辅料超市',
      '2': '新建',
    }
    let status = {
      '0':'未下单',
      '1':'已下单'
    }
    const bread = [{
			href: '/order',
			breadContent: '采购订单'
    }]
    const { purOrder } = this.props
    const PriceDetail = purOrder.PriceDetail
    var PriceDetailPage = purOrder.PriceDetailPage.records
    // if(PriceDetailPage) {
    //   for(let i = 0; i < PriceDetailPage.length; i++) {
    //     PriceDetailPage[i].goodsName = PriceDetailPage[i].goodsName + PriceDetailPage[i].spec  
    //   }
    // }
    const tabColumns = [{
      title: '编号',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '食材名称',
      dataIndex: 'goodsName',
      key: 'goodsName'
    }, {
      title: '计量单位',
      dataIndex: 'unit',
      key: 'unit',
    }, {
      title: '分类',
      dataIndex: 'subcatalogName',
      key: 'subcatalogName',
    },{
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      render: (text, record) => {
        if (record.editable) {
          return (
            <Input
              // value={text}
              onChange={e => this.handleFieldChange(e, 'price', record.id)}
              // onKeyPress={e => this.handleKeyPress(e, record.key)}
              placeholder="28"
            />
          );
        }
        return text;
      }
    }];
    return(
      <div className='Details'>
        <Bread bread={bread} value='/order' />
        <Card className='DetailsOperation' style={{marginTop:'2px'}}>
          <div className='card-body'>
              <Row className='card-header'>
                <Col span={12} className='card-header-title'>
                  <span className="iconfont">&#xe62b;</span>
                  <span className='odd-number'>采购单号：{PriceDetail.priceListCode}</span>
                </Col>
                <Col span={12}  className='right' style={{ fontSize: 14 }}>
                <ButtonGroup className={this.state.btnGroup ? 'btnHidden' : 'btnShow'}>
                  <Button onClick={this.handleCancel}>取消</Button>
                  <Button onClick={this.handleSave}>保存</Button>
                  <Button>导入表格</Button>
                  <Button type='primary'>添加食材</Button>
                </ButtonGroup>
                {this.props.location.status == '0' ?                
                    <ButtonGroup className={this.state.btnGroup ? 'btnShow' : 'btnHidden'}>
                      <Button onClick={this.handleAdjust}>调整</Button>                
                      <Button type='primary'>发布</Button>
                    </ButtonGroup> : 
                  null}
                </Col>
              </Row>
              <Row className='card-content'>
                <Col span={8} >
                  {/* <p className='card-content-top'>订单来源:菜单生成</p> */}
                  <p style={{marginTop:'45px'}}>{PriceDetail.remark}</p>
                </Col>
                <Col span={8}>
                  {/* <p className='card-content-top'>采购区间:2018-12-01至2018-12-07</p> */}
                  {/* <p>备注内容:备注内容备注内容备注内容</p> */}
                </Col>
                <Col span={8}>
                  <Col span={12}><p className='card-content-top'>发布时间</p><p style={{paddingTop:'0px'}}>{PriceDetail.publishTime}</p></Col >
                  <Col span={12}><p className='card-content-top'>食材数量</p><p style={{paddingTop:'0px'}}>{PriceDetail.priceListCount}</p></Col >            
                </Col>
              </Row>
            </div>
          </Card>
          <Card className='DetailContent' style={{marginTop:'15px'}}>
            <div className='DetailContent-header'>
              <span style={{fontSize:'16px'}}>食材明细</span>
            </div>
            {/* {
              getFieldDecorator('ingredientsDetails',{
                initialValue:PriceDetailPage
              })()
            } */}
            <Table columns={tabColumns} dataSource={PriceDetailPage} pagination={false} rowKey='id'></Table>
          </Card>
      </div>
    )
  }
}

// const PriceDetail = Form.create(Price)
// export default PriceDetail
export default connect(( {purOrder} ) => (
  {
  purOrder,
}))(PriceDetail);