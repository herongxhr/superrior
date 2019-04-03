import React from 'react';
import { Breadcrumb , Button } from 'antd';
import { withRouter } from 'dva/router';
import GoBack from '../GoBack'

import './index.less';


class Bread extends React.Component {
  render() {
    const {  bread , value } = this.props;
    return (
      <div className='bread-wrapper' style={{
        background: "#fff",
        boxShadow: "0 2px 4px 0 rgba(0,0,0,0.1)"
      }}>
      
        <Breadcrumb className="bread">
          {
            bread.map((item, index, array) => {
              if (index === array.length - 1) {
                return <Breadcrumb.Item key={index}>{item.breadContent}</Breadcrumb.Item>
              }
              return <Breadcrumb.Item key={index}><a href={item.href}>{item.breadContent}</a></Breadcrumb.Item>
            })
          }
          {value ?  <GoBack value={value} /> : null}
        </Breadcrumb>

      </div>
    )
  }
}

export default Bread;