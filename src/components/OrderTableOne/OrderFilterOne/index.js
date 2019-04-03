import React from 'react'
import { Form , Select , DatePicker , Input, Button } from "antd";
import moment from 'moment';
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
          <FormItem label='发布时间' extra={true}>
            {
              getFieldDecorator('date',{
                  initialValue:moment('2018-08-08'),
              })(
                <DatePicker onChange={this.onChange} style={{width:240}} />
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('search',{
                  initialValue:'123',
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

      