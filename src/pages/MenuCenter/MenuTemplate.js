import React from 'react';
import { List, Select, Input, Button, Badge, Radio, Card, Row, Col, message } from 'antd';
import { routerRedux } from 'dva/router';
import MenuTemplateCard from '../../components/MenuTemplateCard';
import BreadcrumbWithTabs from '../../components/BreadcrumbWithTabs';
import { connect } from 'dva';
import './MenuTemplate.less'
import SorterArrow from '../../components/SorterArrow';

const Option = Select.Option;
const Search = Input.Search;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

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

/**
 * 列表页，有两种类型，通过tab页分开显示
 * 由于数据结果和展示时差别小，共用页面
 * 在state中保存操作id，列表类型和请求参数
 */
class MenuTemplate extends React.Component {
  state = {
    // 保存当前id,类型,请求参数
    currTemplateId: '',
    templateType: 'P',
    queryParams: {
      orderByField: 'create_date',
      keywords: '',
      current: 1,
      pageSize: 9,
      isAsc: false,
    }
  }
  // 查询列表，无确认按钮，两种列表接口不一致
  // didmount和请求条件变化时发起请求
  getTemplateList = (params = {}) => {
    this.setState({
      queryParams: {
        ...this.state.queryParams,
        ...params
      }
    });
    this.props.dispatch({
      type: `menuCenter/fetch${this.state.templateType}MenuTemplate`,
      payload: { ...this.state.queryParams, ...params }
    })
  }
  // didMount时发起请求
  componentDidMount() {
    this.getTemplateList();
    this.haveAnyTemplate();
  }
  // 面包屑tab点击事件
  handleTabChange = () => {
    this.props.dispatch(routerRedux.push({
      pathname: `/menubar`,
    }));
  }

  // 改变模板类型
  changeTemplateType = e => {
    this.setState({
      templateType: e.target.value
    }, () => this.getTemplateList())
  }
  // 对模板进行复制，删除等操作
  // 其中新增，查看，编辑都是还id和类型跳转页面
  // 复制，删除，另存为请求接口
  handleTemplateActions = (e, id) => {
    const { dispatch } = this.props;
    // 通过e.target.id来获取当前操作类型copy,delete,edit
    const action = e.delAction || e.target.id;
    switch (action) {
      case 'delete':// 删除要二次确认
        break;
      case 'view':
        dispatch(routerRedux.push({
          pathname: '/menubar/template/details',
          state: { id, type: this.state.templateType }
        }))
        break;
      case 'update':
        dispatch(routerRedux.push({
          pathname: '/menubar/template/update',
          state: { id, type: this.state.templateType }
        }));
        break;
      case 'copy':
      case 'doDelete':
      case 'saveAsMy':
        this.setState({
          currTemplateId: id,
        });
        // 调用相应的effect方法
        dispatch({
          type: `menuCenter/templateActions`,
          payload: { id, action },
        }).then(this.getTemplateList).then(this.callback)
      default:
        break;
    }
  }

  callback = () => {
    message.success('操作成功')
  }
  // 创建模板
  handleNewTemplate = () => {
    const { dispatch } = this.props;
    // 清空之前菜单数据，菜单详情数据
    dispatch({
      type: 'menuCenter/clearTemplateDetails'
    })
    dispatch(routerRedux.push({
      pathname: `/menubar/menu-template/new`,
      state: { templateType: 'P' }
    }))
  }

  haveAnyTemplate = () => {
    this.props.dispatch({
      type: 'menuCenter/hasAnyTemplate'
    })
  }


  render() {
    const { location, isLoading, anyNewTemplate } = this.props
    const { currTemplateId, templateType } = this.state;
    // 根据模板类型获取相应数据
    const templateList = this.props[`${templateType}MenuTemplate`];
    // 解构相应的（餐饮单位/管理单位）模板数据
    const records = this.props[`${templateType}MenuTemplate`].records || [];
    return (
      <div>
        {/* 面包屑 */}
        <BreadcrumbWithTabs
          {...location}
          tabList={tabList}
          onChange={this.handleTabChange}
          activeTabKey={'template'}
        />
        <Card style={{ width: 1160, margin: '20px auto', }}>
          {/* 筛选区域 */}
          <Row>
            <Col span={4}>
              <Select style={{ width: 170 }}
                defaultValue="create_date"
                onChange={value => this.getTemplateList({ orderByAttr: value })}>
                <Option value="create_date">创建时间</Option>
                <Option value="modify_date">修改时间</Option>
                <Option value="used">使用次数</Option>
              </Select>
            </Col>
            <Col span={1}>
              <SorterArrow onChange={value => this.getTemplateList({ isAsc: value })} />
            </Col>
            <Col span={19}><Search
              onChange={value => this.getTemplateList({ keywords: value })}
              placeholder="模板名称/标签"
              style={{ width: 300 }}
            /></Col>
          </Row>
          {/* 我的/推荐模板按钮组 */}
          <div className={'filterWrapper'}>
            <Button onClick={this.handleNewTemplate} type="primary" >创建模板</Button>
            <RadioGroup onChange={this.changeTemplateType} defaultValue={this.state.templateType}>
              <RadioButton value="P">我的</RadioButton>
              <Badge count={templateType === 'P' ? anyNewTemplate : 0} >
                <RadioButton
                  style={{ borderRadius: '0 4px 4px 0', borderLeft: 'none' }}
                  value="C">
                  <span>推荐</span>
                </RadioButton>
              </Badge >
            </RadioGroup>
          </div>
          {/* 模板卡片展示区 */}
          <List
            grid={{ gutter: 16, column: 3 }}
            dataSource={records}
            pagination={{
              showQuickJumper: true,
              current: templateList.current || 1,
              total: templateList.total || 0,
              pageSize: templateList.size || 9,
              showTotal: total => `共${total}条数据`,
              onChange: (current, pageSize) => this.getTemplateList({ current, pageSize })
            }}
            renderItem={item => (
              <List.Item style={{ marginBottom: 30 }}>
                <MenuTemplateCard
                  itemData={item}
                  key={item.id}
                  // 指出模板类型
                  templateType={templateType}
                  handleTemplateActions={this.handleTemplateActions}
                  // 当前卡片必须与点击的卡片相同时，具备加载状态
                  spinning={item.id === currTemplateId && isLoading}>
                </MenuTemplateCard>
              </List.Item>
            )}
          />
        </Card>
      </div>
    )
  }
}

export default connect(({ menuCenter, loading }) => ({
  CMenuTemplate: menuCenter.CMenuTemplate,
  PMenuTemplate: menuCenter.PMenuTemplate,
  anyNewTemplate: menuCenter.anyNewTemplate,
  // templateActionResult: menuCenter.templateActionResult,
  isLoading: loading.effects['menuCenter/templateActions'],
}))(MenuTemplate);

