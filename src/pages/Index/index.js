import React, { Component } from 'react';
import './index.less';
import TodayMenuCard from '../../components/TodayMenuCard/TodayMenuCard'
import TodoListCard from '../../components/TodoListCard/TodoListCard'
import PurchaseStatistics from '../../components/PurchaseStatistics/PurchaseStatistics'
import DataStatistics from '../../components/DataStatistics/DataStatistics'
import { Link, } from 'react-router-dom'
import axios from 'axios'
import { Card, Button, Radio } from 'antd';
import homeBanner from './homeBanner.png';
import { Bar, Badge } from 'ant-design-pro/lib/Charts';

const salesData = [];
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

for (let i = 0; i < 30; i += 1) {
  salesData.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200,
  });
}



class A extends Component {
  componentDidMount() {
    axios.get('http://yapi.demo.qunar.com/mock/44634/jianguo/data').then((res) => {
      console.log(res)
    })
  }

  onChange = (e) => {
    console.log(`radio checked:${e.target.value}`);
  }

  render() {
    return (
      <div className="App">
        <div>{this.props.children}</div>
        <div className="App-content">
          <div className="App-content-header">
            <div className='App-pic'>
              <img src={homeBanner} />
            </div>
            <div className='App-time'>
              <h3>第32周</h3>
              <h6>2018年12月2日</h6>
            </div>
          </div>
          <div className="App-content-data">
            <div>
              <TodoListCard />
              <div className='tools'>
                <Card title="常用工具" bordered={false} style={{ width: 350 }}>
                  <Button className='toolsbtn cgml'>采购目录</Button>
                  <Button className='toolsbtn'>本月台账</Button>
                  <Button className='toolsbtn'>缺货上报</Button>
                </Card>
              </div>
            </div>
            <TodayMenuCard />
          </div>
          <div className="App-content-accepting">
            <Bar
              height={200}
              title="销售额趋势"
              data={salesData}
              style={{ height: 500 }}
            />
          </div>
          <div className="App-content-footer">
            <div className="App-content-footer-left">
              <div className="App-content-footer-header">
                <span>菜单执行率排行</span>
                <RadioGroup onChange={this.onChange} defaultValue="a">
                  <RadioButton value="1">本月</RadioButton>
                  <RadioButton value="2">本季</RadioButton>
                  <RadioButton value="3">本年</RadioButton>
                </RadioGroup>
              </div>
              <div className="App-content-footer-content">
                <div className="App-content-footer-content-header">
                
                </div>
                <div className="App-content-footer-content-content">
                </div>
              </div>
            </div>
            <div className="App-content-footer-right">
              <div className="App-content-footer-header">
                <span>菜单执行质量排行</span>
                <RadioGroup onChange={this.onChange} defaultValue="a">
                  <RadioButton value="1">本月</RadioButton>
                  <RadioButton value="2">本季</RadioButton>
                  <RadioButton value="3">本年</RadioButton>
                </RadioGroup>
              </div>
              <div className="App-content-footer-content">

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default A;
