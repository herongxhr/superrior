import React, { Component } from 'react';
import './TodayMenuCard.less';
import { Empty} from 'antd';

class TodayMenuCard extends Component {
  state={
    datab:['纯牛奶','核桃仁'] || [],
    dataz:['芹菜炒香干','辣椒炒牛肉','排骨萝卜汤'] || [],
    datad:'',
    dataw:''
  }
  render() {
    return (
      <div className="MenuCard">
        <div className='title'>今日菜单</div>
        <div className='todaymenu'>
            <div className='breakfast'>
              <div>早餐</div>
              <ul>
                {
                  (this.state.datab) ?
                  this.state.datab.map(data => <li>{data}</li>) : <Empty
                  image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                  description={
                    <span>
                      暂未排餐哦~
                    </span>
                  }
                />
                }
              </ul>
            </div>
            <div className='lunch'>
              <div>中餐</div>
              <ul>
                  {
                    (this.state.dataz) ?
                    this.state.dataz.map(data => <li>{data}</li>) : <Empty
                    
                    image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                    description={
                      <span>
                        暂未排餐哦~
                      </span>
                    }
                  />
                  }
                </ul>
            </div>
            <div className='dessert'>
              <div>点心</div>
              <ul>
                {
                  (this.state.datad) ?
                  (this.state.datad.map(data => <li>{data}</li>)) : (<Empty
                  image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                  description={
                    <span>
                      暂未排餐哦~
                    </span>
                  }
                />)
                }
              </ul>
            </div>
            <div className='dinner'>
              <div>晚餐</div>
              <ul>
                {
                  (this.state.dataw) ?
                  this.state.dataw.map(data => <li>{data}</li>) : <Empty
                  image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                  description={
                    <span>
                      暂未排餐哦~
                    </span>
                  }
                />
                }
              </ul>
            </div>
        </div>
        
      </div>
    );
  }
}

export default TodayMenuCard;