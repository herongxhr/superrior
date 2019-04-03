import React from 'react'
import { Form , DatePicker , Radio , Select } from "antd";
import './index.less'

const FormItem = Form.Item;
const Option = Select.Option;

class OrderFilterOne extends React.Component {
  handleChange = (value) => {
    console.log(`selected ${value}`);
  }

  onChange = (date, dateString) => {
    console.log(date, dateString);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return(
      <div className='OrderFilterOne'>
        <Form layout="inline">
          <FormItem label='日期选择' extra={true}>
            {
              getFieldDecorator('date',{
                  initialValue:'全部',
              })(
                <Select     
                style={{ width: 240 }}              
              > 
                <Option value="1">全部</Option>
                <Option value="2">本年</Option>
                <Option value="3">去年</Option>
                <Option value="4">本月</Option>
                <Option value="5">近3个月</Option>
                <Option value="6"> <DatePicker /> </Option>
              </Select> 
              )
            }
          </FormItem>
          <FormItem label='餐饮单位' extra={true} >
            {
              getFieldDecorator('item',{
                  initialValue:'全部',
              })(
                <Select     
                style={{ width: 240 }}              
              > 
                <Option value="1">全部</Option>
                <Option value="2">本年</Option>
              </Select> 
              )
            }
          </FormItem>
        </Form>
        <div className='OrderFilterOne-right' style={{marginTop:4}}>
          <Radio.Group defaultValue="a" buttonStyle="solid" >
            <Radio.Button value="a">全部</Radio.Button>
            <Radio.Button value="b">本年</Radio.Button>
            <Radio.Button value="c">本年</Radio.Button>
          </Radio.Group>
        </div>
      </div> 
    )
  }
}

const WrappedOrderForm = Form.create()(OrderFilterOne)

export default WrappedOrderForm;

      