import React from 'react'
import Bread from '../../components/Bread'
import { Card , Form , Input , Select , Button } from 'antd' 
import JGtag from '../../components/JGtag'
import TableForm from '../../components/JGsetting'
import PicturesWall from '../../components/PicturesWall'
import RichText from '../../components/Rich'

import './index.less'

const FormItem = Form.Item;
const Option = Select.Option;

const tableData = [{
  key: '1',
  food: '番茄',
  number: '60',
  unit: '克',
  phone:'111111111'
}, {
  key: '2',
  food: '鸡蛋',
  number: '40',
  unit: '克',
  phone:'17683763005'
}]

class New extends React.Component {
  handleChange = (value) => {
    console.log(`selected ${value}`);
  }

  handleSubmit = () => {
    let userInfo = this.props.form.getFieldsValue();
    console.log(JSON.stringify(userInfo))
  }

  render() {
    const bread = [{
			href: '/supermarket',
			breadContent: '菜品管理'
    },{
			href: '/supermarket',
			breadContent: '我的'
    },{
			href: '/supermarket',
			breadContent: '新增'
    },]
    const { getFieldDecorator } = this.props.form;
    return(
      <div className='food-new'>
      	<Bread bread={bread} value='/supermarket' />
        <Card
          title='基本属性'
          className='basic-attribute'>
          <Form layout="inline">
            <FormItem label='菜谱名称'>
              {
                getFieldDecorator('foodName', {
                    initialValue: '',
                    rules: [
                        {
                            required: true,
                            message: '用户名不能为空'
                        }
                    ]
                })(
                    <Input placeholder="请输入菜谱名称" style={{width:'260px'}} />
                )
              }
            </FormItem>
            <FormItem label='菜谱类别'>
              {
                getFieldDecorator('type',{
                  initialValue:'1'
                })(
                  <Select  onChange={this.handleChange} style={{width:'260px'}}  placeholder="请选择"
                  >
                    <Option value="1">荤菜</Option>
                    <Option value="2">半荤</Option>
                    <Option value="3">素菜</Option>
                    <Option value="4">汤</Option>
                    <Option value="5">其他</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem label='菜谱别名'>
              {
                getFieldDecorator('otherName',{
                  initialValue:[]
                })(
                  <JGtag />
                )
              }
            </FormItem>
          </Form>
        </Card>
        <Card
          title='食材明细'>
            {getFieldDecorator('foodDetails', {
              initialValue: tableData,
            })(<TableForm />)}
        </Card>
        <Card
          title='图片'>
          <PicturesWall />
        </Card>
        <RichText/>
        <div className='food-new-footer'>
          <Button>取消</Button>
          <Button onClick={this.handleSubmit} type='primary' style={{margin:'0px 20px'}}>保存</Button>
        </div>
      </div>
    )
  }
}

const FoodNew = Form.create()(New)

export default FoodNew