import React from 'react'
import { Card , Divider } from 'antd'
import { withRouter } from 'react-router'

import './index.less'

class MyTemplateCard extends React.Component {
  state = {
    cardHover:true
  }
  handleMouseOver = () => {
    this.setState({
      cardHover:false
    })
  }

  handleMouseOut = () => {
    this.setState({
      cardHover:true
    })  
  }

  handleHistory = () => {
    this.props.history.push('/Particulars')
  }

  render() {
    const styles = {
      width: 340,
      height: 202,
      marginRight: 15,
      marginTop: 20,
      marginLeft:25
    }
    let cardFooter = null
    if(this.state.cardHover) {
      cardFooter = <span>创建:2018-11-01</span>
    } else {
      cardFooter = 
      <div className='cardFooter' style={{width:340,margin:0}}>
        <span className='cardFooterItem' style={{ margin: 0,fontSize:16 }}>复制</span>
        <Divider type="vertical" />
        <span className='cardFooterItem' style={{ margin: 0,fontSize:16 }}>删除</span>
        <Divider type="vertical" />
        <span className='cardFooterItem' style={{ margin: 0,fontSize:16 }}>修改</span>
        <Divider type="vertical" />
        <span className='cardFooterItem' style={{ margin: 0,fontSize:16 }}>使用</span>
      </div>
    }
    return(
      <Card
        className='card'
        style={{ ...styles }}
        actions={[cardFooter]}
        hoverable={true}
        onMouseOver={this.handleMouseOver}
        onMouseLeave={this.handleMouseOut}
        onClick={this.handleHistory}
      >
        {this.props.children}
      </Card>
    )
  }
}

const MyCard = withRouter(MyTemplateCard)

export default MyCard