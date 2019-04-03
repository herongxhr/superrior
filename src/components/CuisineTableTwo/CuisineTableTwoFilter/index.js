import React from 'react'
import { Form , Select , DatePicker , Statistic , Input, Button } from "antd";
import './index.less'

const Option = Select.Option;
const Search = Input.Search;
const FormItem = Form.Item;

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
          <FormItem label='菜品类别' extra={true}>
            {
              getFieldDecorator('date',{
                  initialValue:'1',
              })(
                <Select defaultValue="1" style={{ width: 170 }} onChange={this.handleChange}>
                  <Option value="1">全部</Option>
                  <Option value="2">蔬菜</Option>
                  <Option value="3" >肉食</Option>
                  <Option value="4">水果</Option>
                </Select>
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('search',{
                  initialValue:'',
              })(
                <Search
                  placeholder="请输入关键字进行搜索"
                  onSearch={value => console.log(value)}
                  style={{ width:300,height:32 }}
              />
              )
            }
          </FormItem>
        </Form>
        <div className='OrderFilterOne-right' style={{marginTop:5}}>
          <Button type='primary' style={{marginRight:'10px'}}>查询</Button>
          <Button>重置</Button>
        </div>
      </div> 
    )
  }
}

const WrappedOrderForm = Form.create()(OrderFilterOne)

export default WrappedOrderForm;

      