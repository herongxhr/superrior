import React from 'react'

import './index.less'

class Cartoon extends React.Component {
  render() {
    return(
      <div className='cartoon'>
        <span className="iconfont">&#xe62b;</span>
        <span>有模版上新啦～～</span>
        <div className='triangle'></div>
      </div>
    )
  }
}

export default Cartoon