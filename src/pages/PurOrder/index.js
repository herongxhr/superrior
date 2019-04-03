import React from 'react';
import OrderTableOne from '../../components/OrderTableOne';
import OrderTableTwo from '../../components/OrderTableTwo';
import OrderTableThree from '../../components/OrderTableThree';

import Bread from '../../components/Bread';
import { Tabs  } from 'antd';

import './index.less';

const TabPane = Tabs.TabPane;
// var bread = [{
// 	href: '/order',
// 	breadContent: '采购订单'
// },{
// 	breadContent:'1'
// }]

class PurOrder extends React.Component {
	state = {
		bread:[{
			href: '/order',
			breadContent: '采购订单'
		},{
			breadContent:'定价单'
		}]	
	}
	
	callback = (key) => {
		if(key == '2') {
			this.setState({
				bread:[{
					href: '/order',
					breadContent: '采购订单'
				},{
					breadContent:'待收录'
				}]	
			})
		}
		if(key == '3') {
			this.setState({
				bread:[{
					href: '/order',
					breadContent: '采购订单'
				},{
					breadContent:'采购目录'
				}]	
			})
		} 
	}

	render() {
		return (
			<div className='purOrder'>
			  <Bread bread={this.state.bread} />
				<Tabs defaultActiveKey="1" onChange={this.callback}>
					<TabPane tab="定价单" key="1">
						<OrderTableOne />
					</TabPane>
					<TabPane tab="待收录" key="2">
					 <OrderTableTwo />
					</TabPane>
					<TabPane tab="采购目录" key="3">
					 <OrderTableThree />
					</TabPane>
				</Tabs>,
			</div>
		)
	}
}

export default PurOrder