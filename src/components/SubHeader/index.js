import React from 'react'
import './index.less'
import { Breadcrumb } from 'antd';

class SubHeader extends React.Component {
  render() {
    return(
      <div className='SubHeader'>
       <Breadcrumb>
          <Breadcrumb.Item><a href="">{this.props.title}</a></Breadcrumb.Item>
          <Breadcrumb.Item><a href="">{this.props.subTitle}</a></Breadcrumb.Item>
        </Breadcrumb>
      </div>
    )
  }
}

export default SubHeader