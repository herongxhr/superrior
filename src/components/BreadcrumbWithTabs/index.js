import React from 'react';
import { Breadcrumb, Tabs } from "antd";
import { Link } from "dva/router";
import { connect } from 'dva';
import MenuContext from '@/layouts/MenuContext';
import './index.less';

const { TabPane } = Tabs;

const BreadcrumbWithTabs = ({
    classNames,
    contentWidth,
    tabList,
    onTabChange
}) => {
    <div style={{ margin: '-24px -24px 0' }} className={classNames(classNames, styles.main)}>
        <MenuContext.Consumer>
            {value => {
                return (
                    <PageHeader
                        wide={contentWidth === 'Fixed'}
                        title={
                            <Title
                                level={4}
                                style={{ marginBottom: 0, }}
                            >
                                {title}
                            </Title>
                        }
                        key="pageheader"
                        {...restProps}
                        breadcrumb={conversionBreadcrumbList({
                            ...value,
                            ...restProps,
                            home: <FormattedMessage id="menu.home" defaultMessage="Home" />,
                        })}
                        className={styles.pageHeader}
                        linkElement={Link}
                        footer={renderFooter(restProps)}
                    >
                        {tabList && tabList.length ? (
                            <Tabs
                                className={"tabs"}
                                defaultActiveKey={activeTabKey}
                                onChange={key => onChange(key)}
                            >
                                {tabList.map(item => (
                                    <TabPane tab={item.tab} key={item.key} />
                                ))}
                            </Tabs>) : ''}
                    </PageHeader>
                );
            }}
        </MenuContext.Consumer>
    </div>
}

export default connect(({ setting }) => ({
    contentWidth: setting.contentWidth,
}))(BreadcrumbWithTabs);




