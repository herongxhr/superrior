import React, { Suspense } from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import Footer from './Footer';
import Header from './Header';
import SiderMenu from '@/components/SiderMenu';
import logo from '../assets/logo.svg';
import classNames from 'classnames';
import Media from 'react-media';
import Context from './MenuContext';
import PageLoading from '@/components/PageLoading';
import DocumentTitle from 'react-document-title';
import { ContainerQuery } from 'react-container-query';
import getPageTitle from '@/utils/getPageTitle';
import styles from './BasicLayout.less';

// lazy load SettingDrawer
//const SettingDrawer = React.lazy(() => import('@/components/SettingDrawer'));
const { Content } = Layout;
const query = {
    'screen-xs': {
        maxWidth: 575,
    },
    'screen-sm': {
        minWidth: 576,
        maxWidth: 767,
    },
    'screen-md': {
        minWidth: 768,
        maxWidth: 991,
    },
    'screen-lg': {
        minWidth: 992,
        maxWidth: 1199,
    },
    'screen-xl': {
        minWidth: 1200,
        maxWidth: 1599,
    },
    'screen-xxl': {
        minWidth: 1600,
    },
};
class BasicLayout extends React.Component {
    componentDidMount() {
        console.log('didmout',this.props)
        const {
            dispatch,
            route: { routes, authority },
        } = this.props;
        dispatch({
            type: 'user/fetchCurrent',
        });
        dispatch({
            type: 'setting/getSetting',
        });
        // 在全局state中增加以下属性
        // menuData, breadcrumbNameMap, routerData: routes
        dispatch({
            // 获取菜单数据，也是从本地获取
            type: 'menu/getMenuData',
            payload: { routes, authority },
        });
    }

    // 不涉及this可以不用箭头函数
    getContext() {
        const { location, breadcrumbNameMap } = this.props;
        return {
            location,
            breadcrumbNameMap,
        };
    }

    // 使用边菜单的情况下，布局组件Layout的宽度
    getLayoutStyle = () => {
        const { fixSiderbar, isMobile, collapsed, layout } = this.props;
        if (fixSiderbar && layout !== 'tompmenu' && !isMobile) {
            return {
                paddingLeft: collapsed ? '80px' : '256px',
            }
        }
        return null;
    }

    handleMenuCollapse = collapsed => {
        const { dispatch } = this.props;
        dispatch({
            type: 'global/changeLayoutCollapsed',
            payload: collapsed,
        });
    };

    renderSettingDrawer = () => {
        // Do not render SettingDrawer in production
        // unless it is deployed in preview.pro.ant.design as demo
        if (process.env.NODE_ENV === 'production' && APP_TYPE !== 'site') {
            return null;
        }
        return <SettingDrawer />;
    };

    render() {
        console.log(this.props);
        const { // 大部分属性来自setting model
            navTheme,
            layout: PropsLayout,
            children,
            location: { pathname },
            isMobile,
            menuData,
            breadcrumbNameMap,
            fixedHeader,
        } = this.props;

        const isTop = PropsLayout === 'topmenu';
        const contentStyle = !fixedHeader ? { paddingTop: 0 } : {};
        const layout = (
            <Layout>
                {/* 是否显示边栏菜单布局 */}
                {isTop && !isMobile ? null : (
                    <SiderMenu
                        logo={logo}
                        theme={navTheme}
                        onCollapse={this.handleMenuCollapse}
                        menuData={menuData}
                        isMobile={isMobile}
                        {...this.props}
                    />
                )}
                <Layout
                    style={{
                        ...this.getLayoutStyle(),
                        minHeight: '100vh',
                    }}
                >
                    <Header
                        menuData={menuData}
                        handleMenuCollapse={this.handleMenuCollapse}
                        logo={logo}
                        isMobile={isMobile}
                        {...this.props}
                    />
                    <Content className={styles.content} style={contentStyle}>
                        {children}
                    </Content>
                    {/* <Footer /> */}
                </Layout>
            </Layout>
        );
        return (
            <React.Fragment>
                <DocumentTitle title={getPageTitle(pathname, breadcrumbNameMap)}>
                    <ContainerQuery query={query}>
                        {params => (
                            <Context.Provider value={this.getContext()}>
                                <div className={classNames(params)}>{layout}</div>
                            </Context.Provider>
                        )}
                    </ContainerQuery>
                </DocumentTitle>
                {/* <Suspense fallback={<PageLoading />}>{this.renderSettingDrawer()}</Suspense> */}
            </React.Fragment>
        );
    }
}

export default connect(({ global, setting, menu: menuModel }) => ({
    collapsed: global.collapsed,
    layout: setting.layout,
    menuData: menuModel.menuData,
    breadcrumbNameMap: menuModel.breadcrumbNameMap,
    ...setting,
}))(props => (
    <Media query="(max-width: 599px)">
        {isMobile => <BasicLayout {...props} isMobile={isMobile} />}
    </Media>
));
