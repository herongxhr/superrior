import React, { Component, Fragment } from 'react';
import { Form, Input, Upload, Select, Button } from 'antd';
import PhoneView from './PhoneView';

import './BaseView.less';

const FormItem = Form.Item;
const { Option } = Select;


const validatorPhone = (rule, value, callback) => {
  const values = value.split('-');
  if (!values[0]) {
    callback('Please input your area code!');
  }
  if (!values[1]) {
    callback('Please input your phone number!');
  }
  callback();
};


class Imformation extends Component {
  // componentDidMount() {
  //   this.setBaseInfo();
  // }

  setBaseInfo = () => {
    const { currentUser, form } = this.props;
    Object.keys(form.getFieldsValue()).forEach(key => {
      const obj = {};
      obj[key] = currentUser[key] || null;
      form.setFieldsValue(obj);
    });
  };



  getViewDom = ref => {
    this.view = ref;
  };
  
  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <div className='baseView' ref={this.getViewDom}>
        <div className='left'>
          <div className='setting-title'>
            <div className='setting-main-title'>
              基本信息
            </div>
          </div>
          <Form layout='vertical' onSubmit={this.handleSubmit} hideRequiredMark>
            <FormItem label='单位名称'>
              {getFieldDecorator('company', {
                rules: [
                  {
                    required: true,
                    message: '横店镇教育局',
                  },
                ],
              })(<Input placeholder='横店镇教育局' />)}
            </FormItem>
            <FormItem label='常用邮箱'>
              {getFieldDecorator('email', {
                rules: [{
                  type: 'email', message: '邮箱格式不正确',
                }, {
                  required: true, message: '请输入你的邮箱',
                }],
              })(
                <Input placeholder='hdedu@uanla.com' />
              )}
            </FormItem>
            <FormItem label='个人简介'>
              {getFieldDecorator('phone', {
                rules: [
                  {
                    required: true,
                    message: '请输入您的联系电话',
                  },
                  { validator: validatorPhone },
                ],
              })(<PhoneView />)}
            </FormItem>
            <Button type="primary">
              更新信息
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

const BaseView = Form.create()(Imformation)

export default BaseView