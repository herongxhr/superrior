import React from 'react'
import { Form , DatePicker , Input, Button  } from "antd";
import './index.less'

const Search = Input.Search;
const FormItem = Form.Item;

class OrderFilterThree extends React.Component {
  handleChange = (value) => {
    console.log(`selected ${value}`);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return(
      <div className='OrderFilterThree'>
        <Form layout="inline">
          <FormItem label='食材类别'  extra={true}>
            {
              getFieldDecorator('date',{
                  initialValue:'',
              })(
                <DatePicker onChange={this.onChange} style={{width:170}} />
              )
            }
          </FormItem>

          <FormItem label='定价时间'  extra={true}>
            {
              getFieldDecorator('time',{
                  initialValue:'',
              })(
                <DatePicker onChange={this.onChange} style={{width:240}} />
              )
            }
          </FormItem>

          <FormItem >
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
        <div className='OrderFilterThree-right'>
          <Button type='primary' style={{marginRight:'10px'}}>查询</Button>
          <Button>重置</Button>
        </div>
      </div>

    )
  }
}

const WrappedOrderForm = Form.create()(OrderFilterThree)

export default WrappedOrderForm;

      