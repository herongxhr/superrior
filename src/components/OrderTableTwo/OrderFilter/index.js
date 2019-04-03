import React from 'react'
import { Form , Select , DatePicker , Input  } from "antd";
import './index.less'

const Option = Select.Option;
const Search = Input.Search;
const FormItem = Form.Item;
const { RangePicker } = DatePicker;

class OrderFilter extends React.Component {
  handleChange = (value) => {
    console.log(`selected ${value}`);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return(
      <Form layout="inline">
        <FormItem label='日期选择' style={{ margin:20 }}>
          {
            getFieldDecorator('date',{
                initialValue:'1',
            })(
              <Select     
                style={{ width: 200 }}
              > 
                <Option value="1">全部</Option>
                <Option value="2">本年</Option>
                <Option value="3">去年</Option>
                <Option value="4">本月</Option>
                <Option value="5">近3个月</Option>
                <Option value="6"> <RangePicker /> </Option>
              </Select>            
            )
          }
        </FormItem>

        <FormItem label='订单来源' style={{ margin:20 }}>
          {
            getFieldDecorator('source',{
                initialValue:'1',
            })(
              <Select     
                style={{ width: 200 }}
                onChange={this.handleChange}                            
              > 
                <Option value="1">全部</Option>
                <Option value="2">菜单生成</Option>
                <Option value="3">辅料超市</Option>
                <Option value="4">订单</Option>
              </Select>            
            )
          }
        </FormItem>

        <FormItem  style={{ marginTop:20 }}>
          {
            getFieldDecorator('search',{
                initialValue:'',
            })(
              <Search
                placeholder="订单号/订单来源/状态"
                onSearch={value => console.log(value)}
                style={{ width:300,height:32 }}
            />
            )
          }
        </FormItem>
      </Form>
    )
  }
}

const WrappedOrderForm = Form.create()(OrderFilter)

export default WrappedOrderForm;

      