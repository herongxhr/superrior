import React from 'react'
import { Modal, Select, Input, Table, Tag, List } from 'antd';
import './index.less';

class SelectCatering extends React.Component {

  render() {
    return (
      <div>
        <Modal
          wrapClassName={'selectCatering'}
          width={600}
          maskClosable={false}
          title={'选择餐饮单位'}
          visible={visible}
          okText={'保存'}
          onOk={handleHideModal}
          onCancel={handleHideModal}
        >
          <div className={'selectCateringLeftContent'}>
            <div className={'selectCateringFilterWrap'}>
              <label style={{ width: 42 }}>类别：
                            <Select
                  style={{ width: 170 }}
                  defaultValue={''}
                  onChange={value => this.filterToGetData({ type: value })}>
                  {selectData.map(([value, text]) =>
                    <Option key={value} value={value}>{text}</Option>
                  )}
                </Select>
              </label>
              <Search
                placeholder="请输入关键字进行搜索"
                onSearch={value => this.filterToGetData({ keywords: value })}
                style={{ width: 190, marginLeft: 10 }}
              />
            </div>
            <List
              dataSource={['records']}
              renderItem={item => {
                return (
                  <div className='selectCateringItem'>
                    <div className='cateringItemName'>横店小学</div>
                    <a className='addCatering'>添加</a>
                  </div>
                )
              }}
              pagination={{
                current: dishesData.current || 1,
                pageSize: dishesData.size || 10,
                total: dishesData.total || 0,
                showTotal: total => `共 ${total} 道菜`,
                showQuickJumper: true
              }}
            />
          </div>
          <div className={'selectCateringRightResult'}>
            <ul className={'selectCateringTagList'}>
              {tagListDom}
            </ul>
          </div>
        </Modal>
      </div>
    )
  }
}

export default SelectCatering;