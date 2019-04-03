import React from 'react'
import { Form , Select , Input, Button , Badge ,  Tag , Icon } from 'antd'
import { Link } from 'react-router-dom'
import Cartoon from '../Cartoon'
import MyCard from '../Card'
import { template } from '../../DataConfig'

import './index.less'


const FormItem = Form.Item;
const Option = Select.Option;
const Search = Input.Search;
const ButtonGroup = Button.Group;

class Template extends React.Component {
  state = {
    changeColor:true
  }
  colorChange =  () => {
    this.setState({
      changeColor:!this.state.changeColor
    })
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    return (
      <div className='Template'>
        <div style={{display:'flex',justifyContent:'space-between'}} className='TemplateHeader'>
          <Form layout="inline">
            <FormItem label='排序' colon={true}>
              {
                getFieldDecorator('state',{
                    initialValue:'1'
                })(
                  <Select style={{width:160}}>
                    <Option value="1">创建时间</Option>
                    <Option value="2">修改时间</Option>
                    <Option value="3">使用次数</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem>
              <div className='top-down'>
                <Icon type="caret-up" onClick={this.colorChange} className={this.state.changeColor? 'blue-color' : null} />
                <Icon type="caret-down" onClick={this.colorChange} className={this.state.changeColor? null : 'blue-color'} />
              </div>
            </FormItem>
            <FormItem>
              {
                getFieldDecorator('state',{
                    initialValue:'模板名称/标签'
                })(
                  <Search
                    placeholder="input search text"
                    onSearch={value => console.log(value)}
                    style={{ width: 300 }}
                  />              
                )
              }
            </FormItem>
          </Form>
          <div className='cartoon-wraper'>
              <Cartoon />
          </div>
        </div>

        <div style={{display:'flex',justifyContent:'space-between'}} className='TemplateSubheader'>
          <Button type="primary" >
              <Link to='/createtemplate'>创建模板</Link>
          </Button>
          <ButtonGroup>
            <Button style={{width:70,height:32}}>我的</Button>
            <Button style={{width:80,height:32}}>
              <span>推荐</span>
              <Badge count={8} offset={[10,-6]} />
            </Button>
          </ButtonGroup>
        </div>

        <div className='card-group'>
          {
            template.map(item => 
              (
              <MyCard key={item.key}>
                <div className='card-body'>
                  <p className='card-content'>
                    <span className='card-content-title'>
                      {item.title}
                    </span>
                    <span className='right' style={{ fontSize: 14 }}>
                      {item.subTitle}
                    </span>
                  </p>
                  <p className='card-content'>
                    <span>
                      {item.meal}
                    </span>
                    <span className='right'>
                      {item.subMeal}
                    </span>
                  </p>
                  <p className='card-content'>
                    <span>
                      {item.data}
                    </span>
                    <span className='right'>
                      {item.subData}
                    </span>
                  </p>
                </div>
                <div className='card-footer'>
                  <Tag color="magenta">中小学</Tag>
                  <Tag color="red">夏季</Tag>
                  <Tag color="volcano">高蛋白</Tag>
                  <Tag color="orange">1日5餐</Tag>
                </div>
              </MyCard>
              )
            )
          }
        </div>
      </div>
    )
  }
}

const MenuTemplate = Form.create()(Template)


export default MenuTemplate

