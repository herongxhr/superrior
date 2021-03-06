import React from 'react';
import classNames from 'classnames';
import { Row } from 'antd';
import './index.module.less';

const DescriptionList = ({
  className,
  title,
  col = 3,
  layout = 'horizontal',
  gutter = 32,
  children,
  size,
  ...restProps
}) => {
  const column = col > 4 ? 4 : col;
  return (
    <div className={'descriptionList layout small'} {...restProps}>
      {title ? <div className={'title'}>{title}</div> : null}
      <Row gutter={gutter}>
        {React.Children.map(children, child =>
          child ? React.cloneElement(child, { column }) : child
        )}
      </Row>
    </div>
  );
};

export default DescriptionList;
