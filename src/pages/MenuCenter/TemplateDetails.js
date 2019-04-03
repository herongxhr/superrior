import React, { Component, Fragment } from 'react';
import { Button, Card, Tag, message, Row, Col } from 'antd';
import { getYMD } from '../../utils/utils';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import BreadcurmbComponent from '../../components/BreadcrumbComponent';
import ShowArrangedDishes from '../../components/ShowArrangedDishes';
import './TemplateDetails.less';

const ButtonGroup = Button.Group;
/**
 * 模板新建和编辑页后会跳转到详情页
 * 模板查看也会跳转到详情页
 * 此时location.state会带有idt和type属性
 */
class TemplateDetails extends Component {
    state = {
        id: '',
        type: ''
    }

    static getDerivedStateFromProps(props) {
        const { location: { state } } = props;
        if (state) {
            const { id = '', type = '' } = state;
            return { id, type }
        }
        return null;
    }

    // 跳转至模板编辑页
    handleEditTemplate = () => {
        const { id } = this.state;
        this.props.dispatch(routerRedux.push({
            pathname: '/menubar/menu-template/new',
            state: { id, type: this.state.type }
        }))
    }

    // 对模板进行复制，删除等操作
    handleTemplateActions = e => {
        const { dispatch } = this.props;
        const { id, type } = this.state;
        // 通过e.target.id来获取当前操作类型copy,delete,edit
        const action = e.target.id;
        switch (action) {
            case 'update':
                dispatch(routerRedux.push({
                    pathname: '/menubar/menu-template/update',
                    state: { id, type }
                }));
                return;
            case 'copy':
            case 'delete':
                dispatch({
                    type: `menuCenter/templateActions`,
                    payload: { id, action, callback: this.callback }
                }).then(this.success)
            default:
                return;
        }
    }

    getTemplateDetails = () => {
        const { id, type } = this.state;
        this.props.dispatch({
            type: `menuCenter/fetch${type}TemplateDetails`,
            payload: id
        })
    }

    success() {
        message.success('操作成功');
    }

    componentDidMount() {
        this.getTemplateDetails();
    }

    render() {
        const {
            location,
            templateDetails,
            allMealsData,
            templateName,
            tagString,
        } = this.props;

        const action = (
            <Fragment>
                <ButtonGroup onClick={this.handleTemplateActions}>
                    <Button id='copy' >复制</Button>
                    <Button id='delete' >删除</Button>
                </ButtonGroup>
                <Button type='primary' id='update'>修改</Button>
            </Fragment>
        );

        const logo = < img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />
        return (
            <div>
                <BreadcurmbComponent {...location} />
                <div className={'pageHeader'}>
                    <div className={'wide'}>
                        <div className={'detail'}>
                            {logo && <div className={'logo'}>{logo}</div>}
                            <div className={'main'}>
                                <div className={'headerRow'}>
                                    <div className={'templateDetailsTitle'}>
                                        {templateDetails.templateName}
                                    </div>
                                    <div className={'templateAction'}>{action}</div>
                                </div>
                                <div >
                                    <div className={'templateContent'}>使用次数：{templateDetails.used}</div>
                                    <div className={'templateContent'}>上次使用：{getYMD(templateDetails.lastTime) || '未使用'}</div>
                                    <div className={'templateTags'}>
                                        {tagString.split(',').map((tag, index) => {
                                            const colors = ['#76c182', '#72d1c2', '#62b8f7', '#78eddb', '#6f6ef6', 'pruple', 'red', 'blue'];
                                            return <Tag key={index} color={colors[index]}>{tag}</Tag>
                                        })}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(({ menuCenter }) => ({
    ...menuCenter
}))(TemplateDetails)