import React from 'react'
import { Select,Form,Card,Input,InputNumber } from 'antd'

import './Dosing.less'

const Option = Select.Option;
const FormItem = Form.Item;

class Dose extends React.Component {
  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return(
      <div>
        <Card title='常用配料 - 可设置日常使用较为频繁食材,将在您生成食材采购订单时自动加入'>
          <p>食材/数量</p>
          <Form layout="inline">
            <FormItem>
              {
                getFieldDecorator('state', {
                    initialValue: '1'
                })(
                    <Select style={{width:200}}>
                        <Option value="1">葱</Option>
                        <Option value="2">猪</Option>
                        <Option value="3">鼠</Option>
                        <Option value="4">牛</Option>
                        <Option value="5">龙</Option>
                    </Select>
                )
              }
            </FormItem>
            <FormItem>
              {
                getFieldDecorator('value', {
                    initialValue: '3'
                })(
                  <div>
                    <span className='interval'>/</span>
                    <InputNumber min={1} max={10} defaultValue={3} />
                    <span className='interval'>斤</span>
                  </div>
                )
              }
            </FormItem>
          </Form>
        </Card>
      </div>
    )
  }
}

const Dosing =  Form.create()(Dose)

export default Dosing