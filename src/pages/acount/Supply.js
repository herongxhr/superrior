import React from 'react'
import { Form , Tabs } from 'antd';

import TableForm from './TableForm';
import NestedTable from './NestedTable'


const TabPane = Tabs.TabPane;

class CommonSupply extends React.Component {
  state = {
    supplier:[]
  }

  

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return(
      <div>
        <div className='setting-title'>
          <div className='setting-main-title'>
            餐饮单位管理
          </div>
        </div>
        <Tabs defaultActiveKey="1" onChange={this.callback}>
          <TabPane tab="餐饮单位" key="1">
            <TableForm />
          </TabPane>
          <TabPane tab="群组" key="2">
            <NestedTable />
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

const Supply = Form.create()(CommonSupply)




export default Supply