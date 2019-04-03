import React, { Component } from 'react';
import './PurchaseStatistics.less';
import { Tabs, Radio, Table, Icon } from 'antd';
import { Bar } from 'ant-design-pro/lib/Charts';

const TabPane = Tabs.TabPane;

const salesData = [];
for (let i = 0; i < 12; i += 1) {
  salesData.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200,
  });
}
const columns = [{
    title: '排名',
    dataIndex: 'rank',
    key: 'rank',
  }, {
    title: '菜品名称',
    dataIndex: 'name',
    key: 'name',
    render:  text => <a href="" style={{color:'#54C4CE'}}>{text}</a>
  }, {
    title: '采购次数',
    dataIndex: 'times',
    key: 'times',
    sorter: (a, b) => a.times - b.times,
  }, {
    title: '月涨幅',
    key: 'increase',
    dataIndex: 'increase',
    sorter: (a, b) => a.increase - b.increase,
    render: (text, record) => (
        <span>
            {text}<Icon type="caret-up" style={{color:'#7ED321'}} />
        </span>
      ),
  },];
  
  const data = [{
    key: '1',
    rank: '1',
    name: '青椒土豆丝',
    times: '137',
    increase: '2%'
  }, {
    key: '2',
    rank: '2',
    name: '青椒土豆丝',
    times: '107',
    // render: (text, record) => (
    //     <span>
    //         {text}<Icon type="caret-down" style={{color:'#F5222D'}} />
    //     </span>
    //   ),
    increase: '2%'
  }, {
    key: '3',
    rank: '3',
    name: '青椒土豆丝',
    times: '98',
    increase: '2%'
  },{
    key: '4',
    rank: '4',
    name: '青椒土豆丝',
    times: '67',
    increase: '2%'
  },{
    key: '5',
    rank: '5',
    name: '青椒土豆丝',
    times: '200',
    increase: '2%'
  }];

class PurchaseStatistics extends Component {
    state = { size: 'month' };
    onChange = (e) => {
      this.setState({ size: e.target.value });
    }
    render() {
        const { size } = this.state;
        const operations =  <Radio.Group value={size} onChange={this.onChange}>
                                <Radio.Button value="month">本月</Radio.Button>
                                <Radio.Button value="year">本年</Radio.Button>
                            </Radio.Group>;
        return ( 
        <div className="PurchaseStatistics">
            <Tabs tabBarExtraContent={operations} >
                <TabPane tab="食材采购统计" key="1">
                    <Bar
                        height={150}
                        color='rgba(84,196,206,1)'
                        data={salesData}
                    />
                    <Table style={{marginTop:20}} columns={columns} dataSource={data} />,
                </TabPane>
                <TabPane tab="辅料采购统计" key="2">Content of tab 2</TabPane>
            </Tabs>
        </div>
        );
    }
    }

export default PurchaseStatistics;
