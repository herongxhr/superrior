import React from 'react'
import { Form, Input, Switch, Select, Button } from 'antd';
import './basicConfig.less'
var classNames = require('classnames');


const FormItem = Form.Item;
const { Option } = Select;

class BasicCon extends React.Component {
  state = {
    show:false
  }

  handleSubmit = ()=>{
    let userInfo = this.props.form.getFieldsValue();
    console.log(JSON.stringify(userInfo))
  }

  switchChange = ()=> {
    this.setState({
      show:!this.state.show
    })
  }

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    var btn = classNames({foo:this.state.show},{bar:!this.state.show})
    return(
      <div className='basicConfig'>
        <p>基本配置 - 单位基本配置设置</p>
        <Form layout='vertical'>
          <FormItem label='就餐人数(学生)'>
            {getFieldDecorator('student', {
                  rules: [
                    {
                      required: true,
                      message: 2000,
                    },
                  ],
                })(
                <div style={{width:200}}>
                  <Input placeholder='2000' style={{width:150}} />
                  <span>人</span>
                </div>)}
          </FormItem>
          <FormItem label='就餐人数(教职工)'>
            {getFieldDecorator('worker', {
                  rules: [
                    {
                      required: true,
                      message: 300,
                    },
                  ],
                })(
                <div style={{width:200}}>
                  <Input placeholder='300' style={{width:150}} />
                  <span>人</span>
                </div>)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('checked', {
              initialValue:true
                })(<Switch onChange={this.switchChange} />)}
          </FormItem>
          <div className={btn}>
            <FormItem label='菜单(选择时间后,系统将自动为你执行菜单)'>
              {
                  getFieldDecorator('state', {
                      initialValue: '1'
                  })(
                      <Select>
                          <Option value="1">菜单下发后1小时</Option>
                          <Option value="2">菜单下发后2小时</Option>
                          <Option value="3">菜单下发后3小时</Option>
                          <Option value="4">菜单下发后4小时</Option>
                          <Option value="5">菜单下发后5小时</Option>
                      </Select>
                  )
              }
            </FormItem>
            <FormItem label='采购订单(选择时间后,系统将自动为你下达采购订单)'>
              {
                    getFieldDecorator('value', {
                        initialValue: '请选择'
                    })(
                        <Select>
                            <Option value="1">菜单下发后1小时</Option>
                            <Option value="2">菜单下发后2小时</Option>
                            <Option value="3">菜单下发后3小时</Option>
                            <Option value="4">菜单下发后4小时</Option>
                            <Option value="5">菜单下发后5小时</Option>
                        </Select>
                    )
                }
            </FormItem>
          </div>
          <Button type="primary" onClick={this.handleSubmit}>
              更新信息
          </Button>
        </Form>
      </div>
    )
  }
}

const BasicConfig = Form.create()(BasicCon)


export default BasicConfig