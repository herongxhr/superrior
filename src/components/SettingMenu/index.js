import React from 'react'
import { Menu } from 'antd'
import { BrowserRouter as Router , Link, NavLink } from 'react-router-dom'


class SettingMenu extends React.Component {
  state = {
    current: 'mail',
  }

  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }

  render() {
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="inline"
      >
        <Menu.Item key="1">
          <NavLink to='/Setting/imformation'>基本设置</NavLink>
        </Menu.Item>
        {/* <Menu.Item key="2">
          <NavLink to='/Setting/set'>基本配置</NavLink>
        </Menu.Item> */}
        <Menu.Item key="3">
          <NavLink to='/Setting/security'>安全设置</NavLink>
        </Menu.Item>
        <Menu.Item key="4">
          <NavLink to='/Setting/supply'>餐饮单位管理</NavLink>
        </Menu.Item>
        {/* <Menu.Item key="5">
          <NavLink to='/Setting/cuisine'>常用配料</NavLink>
        </Menu.Item> */}
      </Menu>
    );
  }
}

export default SettingMenu