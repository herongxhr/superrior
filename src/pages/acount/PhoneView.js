import React, { Fragment, PureComponent } from 'react';
import { Input } from 'antd';
import './PhoneView.less';

class PhoneView extends PureComponent {
  render() {
    const {  onChange } = this.props;
    const value = '0752-268888888'
    let values = ['', ''];
    if (value) {
      values = value.split('-');
    }
    return (
      <Fragment>
        <Input
          className='area_code'
          value={values[0]}
          onChange={e => {
            onChange(`${e.target.value}-${values[1]}`);
          }}
        />
        <Input
          className='phone_number'
          onChange={e => {
            onChange(`${values[0]}-${e.target.value}`);
          }}
          value={values[1]}
        />
      </Fragment>
    );
  }
}

export default PhoneView;
