import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Card, Table, Form, Row, Col, Select, Button, Dropdown, Menu, DatePicker } from 'antd';
import styles from './MenuList.less';
import { getYMD } from '../../utils/utils';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import BreadcrumbWithTabs from '@/components/BreadcrumbWithTabs';

const FormItem = Form.Item;
const { Option } = Select;
const { WeekPicker } = DatePicker;
// breadcrumbWithTabs中tabs数据
const tabList = [
	{
		key: 'menu',
		tab: '周菜单',
	},
	{
		key: 'template',
		tab: '菜单模板',
	},
];

class MenuCenter extends React.Component {
	state = {
		current: 1,
		pageSize: 10,
		startDate: '',
		endDate: '',
		status: '',
		orderByField: '',
		isAsc: false
	}

	// 点击tabs标签跳转到指定页面
	// 页面state中的activeTabKey会传给面包屑
	handleTabChange = key => {
		this.props.dispatch(routerRedux.push({
			pathname: `/menubar/${key}`,
		}));
	}

	// 查看订单详情
	handleShowDetail = record => {
		this.props.dispatch(routerRedux.push({
			pathname: `/menubar/unified-menu/details`,
			state: {
				id: record.id,
				type: 'unified-menu'
			}
		}));
	}
	// 获取菜单列表
	getMenuList = (params = {}) => {
		this.setState(params);
		this.props.dispatch({
			type: 'menuCenter/fetchMenuList',
			payload: {
				...this.state,
				...params
			}
		});
	}
	// commonFilter新建按钮点击回调
	// 下拉式按钮返回e指向当前点击按钮本身
	// 自定义菜单时，清空之前排餐数据
	handleBtnClick = e => {
		const { dispatch } = this.props;
		// 清空之前菜单数据，菜单详情数据
		dispatch({
			type: 'menuCenter/clearMenuDetails'
		})
		// 跳转页面,从模板新建要先经过选择模板
		dispatch(routerRedux.push({
			pathname: `/menubar/menu/${e.key}`,
		}))
	}

	componentDidMount() {
		this.getMenuList();
	}

	render() {
		const tableColumns = [
			{
				title: '菜单编号',
				dataIndex: 'menuCode',
				key: 'menuCode',
			},
			{
				title: '有效时间',
				dataIndex: 'date',
				key: 'date',
				render: (_, record) =>
					getYMD(record.beginDate) + '~' + getYMD(record.endDate)
			},
			{
				title: '餐饮单位',
				key: 'cateringList',
			},
			{
				title: '下达时间',
				dataIndex: 'createTime',
				key: 'createTime',
				render: text => getYMD(text)
			},
			{
				title: '操作',
				key: 'actions',
				// render: (_, record) => {
				// 	const status = record.status || '1'
				// 	if (status === '0') {
				// 		return <a onClick={e => { this.handleDelete(e, record) }}>删除</a>
				// 	} else if (status === '1') {
				// 		return <span onClick={() => this.handleView(record)}
				// 			style={{ cursor: 'pointer' }}>查看</span>;
				// 	} else {
				// 		return <span>已过期</span>
				// 	}
				// }
			}
		];
		const menuBtn = (
			<Menu onClick={this.handleBtnClick}>
				<Menu.Item key={'custom'}>自定义菜单</Menu.Item>
				<Menu.Item key={'from-template'}>模板导入</Menu.Item>
			</Menu>
		)


		const { location, menuList, form: { getFieldDecorator } } = this.props;
		const records = menuList.records || [];
		return (
			<PageHeaderWrapper
			>
			<BreadcrumbWithTabs 
			
			/>
				<Card className={'tableList'} bordered={false}>
					<div className='menuListFilter'>
						<Form onSubmit={this.handleSearch} layout="inline">
							<Row className={'filterRow'} gutter={{ md: 8, lg: 24, xl: 48 }}>
								<Col md={12} sm={24}>
									<FormItem label="开始时间">
										{getFieldDecorator('startWeek')
											(<WeekPicker style={{ width: 140 }} />)}
									</FormItem>
									<FormItem label="结束时间">
										{getFieldDecorator('endWeek')
											(<WeekPicker style={{ width: 140 }} />)}
									</FormItem>
								</Col>
								<Col md={8} sm={24}>
									<FormItem label="餐饮单位">
										{getFieldDecorator('status')(
											<Select placeholder="请选择" style={{ width: 240 }}>
												<Option value="0">关闭</Option>
												<Option value="1">运行中</Option>
											</Select>
										)}
									</FormItem>
								</Col>
								<Col md={4} sm={24}>
									<span className={'submitButtons'}>
										<Button type="primary" htmlType="submit">
											查询
              								</Button>
										<Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
											重置
             								</Button>
									</span>
								</Col>
							</Row>
							<Row className={'filterRow'}>
								<Col>
									<Dropdown overlay={menuBtn}>
										<Button style={{ width: 110 }} icon='plus' type='primary'>新建</Button>
									</Dropdown>
								</Col>
							</Row>
						</Form>
					</div>
					<Table
						columns={tableColumns}
						dataSource={records}
						rowKey="id"
						pagination={{
							current: menuList.current || 1,
							pageSize: menuList.size || 10,
							total: menuList.total || 0
						}}
						onChange={({ current, pageSize }) =>
							this.getMenuList({ current, pageSize })}
					/>
				</Card>
			</PageHeaderWrapper>
		)
	}
}

const WrappedMenuCenter = Form.create()(MenuCenter)

export default connect(({ menuCenter }) => ({
	menuList: menuCenter.menuList,
}))(WrappedMenuCenter); 