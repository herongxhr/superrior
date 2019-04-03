import React from 'react'
import { Checkbox } from 'antd';
 
import './CheckBoxSmallCard.less'

const CheckboxGroup = Checkbox.Group;
const defaultCheckedList = [];

class CheckBoxSmallCard extends React.Component {

  state = {
    checkedList: defaultCheckedList,
    indeterminate: true,
    checkAll: false,
  };

  onChange = (checkedList) => {
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length && (checkedList.length < this.props.plainOptions.length),
      checkAll: checkedList.length === this.props.plainOptions.length,
    });
  }

  onCheckAllChange = (e) => {
    this.setState({
      checkedList: e.target.checked ? this.props.plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  }

  render() {
    var length = this.props.plainOptions.length - this.state.checkedList.length
    return (
      <div className='CheckBoxSmallCard'>
        <div className='CheckBoxSmallCard-header' >
          <Checkbox
            // indeterminate={this.state.indeterminate}
            onChange={this.onCheckAllChange}
            checked={this.state.checkAll}
          >
            <span>{length}个</span>
          </Checkbox>
          <span>已选</span>
        </div>
        <CheckboxGroup options={this.props.plainOptions} value={this.state.checkedList}  onChange={this.onChange} /> 
      </div>
    )
  }
}

export default CheckBoxSmallCard