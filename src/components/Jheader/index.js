import React, { Component } from 'react';
import { BrowserRouter as Router , Link, NavLink } from 'react-router-dom'
import { Layout, Menu, Icon , Badge , Divider} from 'antd';

import logo from './logo.png';


import './index.less'

const { Header } = Layout;

class Jheader extends Component {
	render() {
		return (
				<div className='header-wrapper'>
					<Header>
						<Menu
							theme="dark"
							mode="horizontal"
							style={{ lineHeight: '70px' }}
						>
							<Menu.Item disabled style={{ width: 125 }} key="logo">
									<img src={logo} alt="安品" />
							</Menu.Item>
							<Menu.Item key="1">
								<NavLink to='/home'>
									<Icon type="home" />
									工作台
								</NavLink>
							</Menu.Item>
							<Menu.Item key="2">
								<NavLink to='/menubar'>
									<Icon type="bars"></Icon>
									<span>菜单中心</span>
								</NavLink>
							</Menu.Item>
							<Menu.Item key="3">
								<NavLink to='/supermarket'>
									<Icon type="shopping"></Icon>
									<span>菜品管理</span>
								</NavLink>								
							</Menu.Item>
							<Menu.Item key="4">
								<NavLink to='/order'>
									<Icon type="profile"></Icon>
									采购定价
								</NavLink>
							</Menu.Item>
							<Menu.Item key="5">
								<NavLink to='/delivery'>
									<Icon type="bar-chart"></Icon>
									统计中心
								</NavLink>
							</Menu.Item>
							<Menu.Item key="9" className='right' style={{ width: 60, float: 'right' }}> 
								<NavLink to='/setting'>
									<Icon
										style={{ fontSize: 16 }}
										type="setting">
									</Icon>
								</NavLink>
							</Menu.Item>
							<Menu.Item key="8" style={{ width: 60, textAlign: 'right', float: 'right' }}>
								<NavLink to='/message'>
									<Badge count={5}>
										<span className="iconfont">&#xe62b;</span>
									</Badge>
									<Divider type="vertical" style={{marginLeft:24}}/>
								</NavLink>
							</Menu.Item>

						</Menu>
					</Header>
				</div>
		);
	}
}

export default Jheader