import React from 'react'
import { Layout } from 'antd';
import { Menu, Icon } from 'antd';

import SettingMenu from '../../components/SettingMenu'

import './index.less'


const {
  Header, Content, Footer, Sider,
} = Layout


class Setting extends React.Component {
  render() {
    return(
      <Layout className='setLayout'>
        <Content style={{ width:'1160px' , height:'854px', margin:'0px auto' , background: '#fff', marginTop:'20px' }}>
          <Layout style={{ padding: '24px 0', background: '#fff' }}>
            <Sider width={200} style={{ background: '#fff' }}>
              <SettingMenu />
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              {this.props.children}
            </Content>
          </Layout>
        </Content>
      </Layout>
    )
  }
}

export default Setting