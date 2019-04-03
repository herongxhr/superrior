import React from 'react'
import {
  Table,Select,Modal,Divider,Button,Icon,Input
} from 'antd';
import { connect } from 'dva'

import CheckBoxCard from './CheckBoxCard'

import './NestedTable.less'

const Option = Select.Option;

class NestedTable extends React.Component {
  state = { visible: false,display: false }
  
  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  displayModal  = () => {
    this.setState({
      display:true,
    })
  }

  displayOk = (e) => {
    this.setState({
      display: false
    })
  }

  displayCancel = (e) => {
    this.setState({
      display: false,
    });
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
  

  queryGroup() {
    const { dispatch } = this.props
		dispatch({
			type:'setting/queryGroup'
    })
  }

  // queryGroupUnit() {
  //   const { dispatch } = this.props
	// 	dispatch({
	// 		type:'setting/queryGroupUnit'
  //   })
  // }

  componentDidMount() {
    this.queryGroup()
  }


  render() {
    const columns = [
      { title: '类别', dataIndex: 'groupName', key: 'groupName' },
      { title: '单位数', dataIndex: 'cateringCount', key: 'cateringCount' },
      { 
        title: '操作',
        key: 'setting',
        render: () => (
          <span><a onClick={this.displayModal}>设置单位</a><Divider type='vertical' /><a>编辑</a><Divider type='vertical' /><a>删除</a><Divider type='vertical' /></span>
        ),
      },
    ];
    const { setting }  = this.props
    const dataSource = setting.Group.records
    const modalObject = {
      padding:'0px 0px',
    }
    return (
      <div>
        <Button type='primary' style={{marginBottom:'15px'}} onClick={this.showModal}><Icon type="plus" />添加群组</Button>
        <Table
          className="components-table-demo-nested"
          columns={columns}
          dataSource={dataSource}
          rowKey='id'
        />
        {/* <Modal
         title="设置群组成员单位"
         visible={this.state.display}
         onOk={this.displayOk}
         onCancel={this.displayCancel}
         >
          <CheckBoxCard />
        </Modal> */}
        <Modal
          title="添加群组"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          centered={true}
        >
          <Input placeholder='请输入群组名称' />
        </Modal>
        <Modal
         title="设置群组成员单位"
         visible={this.state.display}
         onOk={this.displayOk}
         onCancel={this.displayCancel}
         bodyStyle={modalObject}
         width='453px'
         style={{height:320}}
         okText="确认"
         cancelText="取消"
        >
          <CheckBoxCard />
        </Modal>
      </div>

    );
  }

}

export default connect(( {setting} ) => ({
  setting,
}))(NestedTable); 