import React from 'react'
import { Tabs } from 'antd'
import TableOne from '../../components/TableOne'
import Bread from '../../components/Bread'
import MenuTemplate from '../../components/MenuTemplate'



import './index.less'

const TabPane = Tabs.TabPane;

const tab2Columns = [{
	title: '菜单编号',
  dataIndex: 'menuID',
  key: 'menuID',
},{
	title: '周次',
  dataIndex: 'weekly',
  key: 'weekly',
},{
	title: '日期',
  dataIndex: 'date',
  key: 'date',
},{
	title: '执行状态',
  dataIndex: 'status',
	key: 'status',
	render(status){
		let config  = {
			'0':'已执行',
			'1':'未执行',
	}
		return config[status]
	}
},{
	title:'操作',
	dataIndex:'operation',
	key:'operation',
	render(operation){
		return operation == 1?<span style={{color:'blue'}}>删除</span>:''
	}
}]

class MenuCenter extends React.Component {
	state = {
		bread:[{
			href: '/menubar',
			breadContent: '菜单中心'
		},{
			href:'/menubar',
			breadContent: '周菜单'
		}]
	}

	callback = (key) => {
		if(key == '2') {
			this.setState({
				bread:[{
					href: '/menubar',
					breadContent: '菜单中心'
				},{
					breadContent:'菜单模板'
				}]	
			})
		} 
	}

  render() {
    return (
      <div className='menu-center-wrapper'>
				<Bread bread={this.state.bread} />
				<Tabs defaultActiveKey="1" onChange={this.callback}>
					<TabPane tab="周菜单" key="1">
						<TableOne />
					</TabPane>
					<TabPane tab="菜单模板" key="2">
					 <MenuTemplate />
					</TabPane>
				</Tabs>,
      </div>
    );
  }
}

export default MenuCenter