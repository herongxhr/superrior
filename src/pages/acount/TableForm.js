import React from 'react'
import { Table , Divider , Select , Modal  } from 'antd'
import { connect } from 'dva'
import { routerRedux } from 'dva/router';
import GetCateringDetail from '../../components/GetCateringDetail'



const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  }
};

const Option = Select.Option;

class TableForm extends React.Component {
  state = {
    visible:false,
    visual:false,
    id:''
  }

  queryCatering() {
    const { dispatch } = this.props
		dispatch({
			type:'setting/queryCatering'
    })
  }

  queryGroup() {
    const { dispatch } = this.props
		dispatch({
			type:'setting/queryGroup'
    })
  }

  showModal = () => {
    this.setState({
      visual: true,
    });
    this.queryGroup()
  }

  handleOk = (e) => {
    const { dispatch } = this.props
		dispatch({
			type:'setting/settingSaveGroup'
    })
    this.setState({
      visible: false
    })
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  componentDidMount() {
    this.queryCatering()
  }

  handleChange = (value) => {
    console.log(`selected ${value}`);
  }

  rowClick = (key) => {
    const { dispatch } = this.props
    dispatch({
      type:'setting/changeVisble',
      payload: {
        visible:true
      }
    })
    this.setState({
      id:key
    })
  }

  render() {
    var _this = this
    const columns = [{
      title:'单位名称',
      key:'cateringName',
      dataIndex:'cateringName',
      render(text) {
        return <a>{text}</a>
      }
    },{
      title:'负责人',
      key:'administrator',
      dataIndex:'administrator'
    },{
      title:'负责人电话',
      key:'mobile',
      dataIndex:'mobile'
    },{
      title:'所属群组',
      key:'groupName',
      dataIndex:'groupName',
      render(text) {
        return <span>{text}<Divider type='vertical' /><a onClick={_this.showModal}>设置</a></span>
      }
    }]
    const { setting }  = this.props
    const { id } =  this.state
    const dataSource = setting.Catering.records
    const settingGroup = setting.Group.records
    // const modalObject = {
    //   padding:'0px 0px',
    // }
    return(
      <div>
        <Table columns={columns} dataSource={dataSource} rowSelection={rowSelection} rowKey='id' 
          onRow={(record) => {
            return {
              onClick: () => {
                this.rowClick(record.id)
              }
            }
          }} />
        <Modal
          title="添加群组"
          visible={this.state.visual}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Select  style={{ width: 120 }} onChange={this.handleChange}>
            {settingGroup ? settingGroup.map((item,index) => (<Option value={item.groupName} key={index}>{item.groupName}</Option >)) : null}                                                    
          </Select>
        </Modal>
        {/* <Modal
         title="设置群组成员单位"
         visible={true}
         onOk={this.displayOk}
         onCancel={this.displayCancel}
         bodyStyle={modalObject}
         width='453px'
         style={{height:320}}
         okText="确认"
         cancelText="取消"
        >
          <CheckBoxCard />
        </Modal> */}
        {setting.visible ? <GetCateringDetail value={id} /> : null}
      </div>

    )
  }
}

export default connect(( {setting} ) => ({
  setting,
}))(TableForm); 
