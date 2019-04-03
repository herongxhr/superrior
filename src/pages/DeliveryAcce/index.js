import React from 'react'
import { Card,Table,Tag  } from 'antd'
import Axios from '../../axios'
import SubHeader from '../../components/SubHeader'

import './index.less'

const tabList = [{
  key: 'tab1',
  tab: '待配送',
}, {
  key: 'tab2',
  tab: '待验收',
},{
	key:'tab3',
	tab:'已验收'
}];

const tab1Columns = [{
  title: '配送单号',
  dataIndex: 'order',
  key: 'order',
}, {
  title: '供应商',
  dataIndex: 'Supplier',
  key: 'Supplier',
}, {
  title: '配送日期',
  dataIndex: 'Delivery',
  key: 'Delivery',
}, {
	title: '摘要',
  dataIndex: 'abstract',
	key: 'abstract',
	render: abstract => (
    <span>
      {abstract.map((item,i) => <Tag color="blue" key={i}>{item}</Tag>)}
    </span>
  ),
}, {
	title: '操作',
  dataIndex: 'Operation',
  key: 'Operation',
}];





class E extends React.Component {
  state = {
    key: 'tab1',
		noTitleKey: 'app',
		DataSource:[]
  }

  onTabChange = (key, type) => {
		this.setState({ [type]: key });
	}
	
	componentDidMount() {
    Axios.ajax({
      url:'/delivery'
    }).then((value) => {
      this.setState({
        DataSource:value
      })
    })
	}

  render() {
		const contentList = {
			tab1: <Table columns={tab1Columns} dataSource={this.state.DataSource} />,
			tab2: <Table columns={tab1Columns} dataSource={this.state.DataSource} />,
			tab3: <Table columns={tab1Columns} dataSource={this.state.DataSource} />
		};
    return (
      <div className='DeliveryAcce'>
        <Card
          style={{ width: '100%' }}
          title={<SubHeader title='菜单中心' subTitle='统一菜单' />}
          tabList={tabList}
          activeTabKey={this.state.key}
          onTabChange={(key) => { this.onTabChange(key, 'key'); }}
        >
          <div>
            <div className='delivery-content'>
              {contentList[this.state.key]}
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

export default E