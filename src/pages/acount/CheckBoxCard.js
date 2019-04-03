import React from 'react'
import { Checkbox , Icon } from 'antd';
import { connect } from 'dva'

import CheckBoxSmallCard from './CheckBoxSmallCard'

import './CheckBoxCard.less'

const CheckboxGroup = Checkbox.Group;

const defaultCheckedList = [];

function isEmptyObject(e) {  
  var t;  
  for (t in e)  
      return !1;
  return !0;
}  

class CheckBoxCard extends React.Component {
  constructor() {
    super()
    this.state = {
      plainOptions:defaultCheckedList,
      checkedList: defaultCheckedList,
      indeterminate: true,
      checkAll: false,
    };
  }

  static getDerivedStateFromProps(props) {
    var array = []
    // if(props.setting.GroupUnit.join('') !== '') {
    //   props.setting.GroupUnit.records.forEach(item => array.push(item.cateringName))
    // }
    if (!isEmptyObject(props.setting.GroupUnit)) {
      props.setting.GroupUnit.records.forEach(item => array.push(item.cateringName))
    }
    return {
      plainOptions: array
    }
  }

  onChange = (checkedList) => {
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length && (checkedList.length < this.state.plainOptions.length),
      checkAll: checkedList.length === this.state.plainOptions.length,
    });
  }

  queryGroupUnit() {
    const { dispatch } = this.props
		dispatch({
			type:'setting/queryGroupUnit'
    })
  }

  componentDidMount() {
    this.queryGroupUnit()
  }

  onCheckAllChange = (e) => {
    this.setState({
      checkedList: e.target.checked ? this.state.plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  }

  render() {
    const { plainOptions , checkedList} = this.state
    if(plainOptions) {
      var length = plainOptions.length - this.state.checkedList.length
    }
    // const { setting }  = this.props
    // const groupUnit = setting.GroupUnit.records
    // if(groupUnit) {
    //   let array = []
    //   groupUnit.forEach(item => array.push(item.cateringName))
    //   console.log(array)
    //   this.setState({
    //     plainOptions:array
    //   })
    // }
    // let a = {groupUnit ? (groupUnit.forEach(item => plainOptions.push(item))) : '' }
    return (
      <div className='CheckBoxCard'>
        <div className='firstCard'>
          <div className='firstCard-header'>
            <Checkbox
              // indeterminate={this.state.indeterminate}
              onChange={this.onCheckAllChange}
              checked={this.state.checkAll}
            >
              <span>{length}个</span>
            </Checkbox>
            <span>待选</span>
          </div>
          <CheckboxGroup options={plainOptions} value={this.state.checkedList}  onChange={this.onChange} /> 
        </div>
        <div className='interval'>
          <div className='interval-first'>
            <Icon type="left" />
          </div>
          <div>
            <Icon type="right" />
          </div>
        </div>
        <CheckBoxSmallCard plainOptions={this.state.checkedList} />
      </div>
    )
  }
}

// export default CheckBoxCard
export default connect(( {setting} ) => ({
  setting,
}))(CheckBoxCard); 