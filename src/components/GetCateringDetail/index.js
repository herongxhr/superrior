import React from 'react'
import { connect } from 'dva';
import { Modal } from 'antd'

import './index.less'

class GetCateringDetail extends React.Component {
  queryData() {
    const { dispatch , value } = this.props;
    dispatch({
      type: 'setting/querySettingGetCateringDetail',
      payload:{
        cateringId:value
      }
    })
  }
  
  componentDidMount() {
    this.queryData()
  }
  
  hideModal = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'setting/changeVisble',
      payload:{
        visible:false
      }
    })
  }


  render() {
    const { visible , CateringDetail } = this.props.setting
    return (
        <Modal
          title="查看信息"
          visible={visible}
          onOk={this.hideModal}
          okText="取消"
          className='modal-table'
          width='837px'
        >
          <table border="1">
            <tbody>
              <tr>
                <th>用户名称</th>
                <td>{CateringDetail.administrator}</td>
                <th>邮箱</th>
                <td>{CateringDetail.email}</td>
              </tr>
              <tr>
                <th>地区</th>
                <td>{CateringDetail.zoneInfo}</td>
                <th>上级管理单位</th>
                <td>{CateringDetail.superiorStr}</td>
              </tr>
              <tr>
                <th>学校负责人</th>
                <td>{CateringDetail.cateringName}</td>
                <th>食堂管理员</th>
                <td>{CateringDetail.groupName}</td>
              </tr>
              <tr>
                <th>学校负责人电话</th>
                <td>{CateringDetail.mobile}</td>
                <th>食堂管理员电话</th>
                <td>2</td>
              </tr>
              <tr>
                <th>备注</th>
                <td colSpan='3'>{CateringDetail.description}</td>
              </tr>
            </tbody>
          </table>
        </Modal>
    )
  }
}

export default connect(({ setting }) => ({
  setting
}))(GetCateringDetail);
