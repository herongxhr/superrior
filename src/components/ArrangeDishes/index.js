import React, { Component } from 'react';
import { routerRedux } from 'dva/router';
import SelectDishes from '../SelectIDishes';
import classNames from 'classnames';
import { Button } from 'antd';
import styles from './index.module.less';

const sortMealsData = (objectArray = [], property) => {
    return objectArray.length > 0 && objectArray.reduce((acc, obj) => {
        let key = obj[property];
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
    }, {});
}

// 组件要接收allMealsData数据，
// 还要接收menu菜单/template模板中的排菜数据
export default class ArrangeDishes extends Component {
    state = {
        // 显示选菜modal
        showModal: false,
        // 当前操作列也就是餐次
        mealTimes: '',
        // 当前操作行也就是周次
        zj: '',
        // 当前操作的菜品id
        foodId: ''
    }

    // 选菜/选食材弹出框中点击确定或取消的回调
    hideModal = () => {
        this.setState({
            showModal: false
        })
    }
    // 点击(添加/更换按钮)时弹出(选菜/选食材弹出框)
    showModal = () => {
        this.setState({
            showModal: true
        })
    }

    /**
     * 所有事件冒泡到td单元格上，好采集周次rowIndew餐次mealTimes信息
     * 同时利用state保存当前点击信息；同时控制选菜或选食材modal的显示
     * 利用forStaff,isAdd,currFoodId保存是否职工餐，是否新加餐，当前操作菜名
     */
    handleShowModal = (e, zj, mealTimes) => {
        // 只有添加按钮和两个更换和删除按钮是LI标签
        if (e.target.nodeName !== 'LI') return;
        // 添加按钮本身有id, 更换和删除的id在parentNode上
        const foodId = e.target.id || e.target.parentNode.id;
        // 记录当前点击菜名的id，要考虑点了按钮的情况
        const flag = e.target.getAttribute('flag') || null;
        this.setState({
            mealTimes,
            zj,
            foodId
        }, () => {
            // 点击了删除按钮,则执行删除操作
            if (flag === '-1') {
                this.changeArrangedMeals({ id: this.state.foodId }, -1);
                return;
            }
            this.showModal();
        })
    }

    // 在选菜/选食材弹出框中点击添加或点击标签关闭时回调
    // flag为1为添加，-1时为删除，0为替换
    // 使用state中的zj和mealTimes定位单元格
    changeArrangedMeals = (record, flag) => {
        this.props.dispatch({
            type: 'menuCenter/changeArrangedMeals',
            payload: {
                record,
                ...this.state,
                flag
            }
        });
        // 当换过一次菜后，将之前所换菜的id设为currFoodId
        if (flag === 0) {
            this.setState({
                foodId: record.id
            })
        }
    };

    // 选菜或选食材中筛选区域
    getDishList = params => {
        this.props.dispatch({
            type: 'menuCenter/fetchDishList',
            payload: params
        })
    }

    // 选菜或选食材modal表格中点击查看的回调
    // 此方法要添加到选菜或选食材modal表头定义中
    handlePreviewItem = ({ id }) => {
        const { dispatch } = this.props;
        dispatch(routerRedux.push({
            pathname: '/',
            state: { id }
        }))
    }

    // 得到当前天当前餐次的菜品列表
    getCurrTDMeals = () => {
        const { zj, mealTimes } = this.state;
        const { allMealsData } = this.props;
        if (zj && mealTimes) {
            // 按周几分类数据，返回对象
            const mealsSortedByWeekday = sortMealsData(allMealsData, 'zj');
            // 按餐次分类数据，返回对象
            const onedayMeals = mealsSortedByWeekday[zj] != null
                ? sortMealsData(mealsSortedByWeekday[zj], 'mealTimes') : {};
            return onedayMeals[mealTimes] || [];
        } else {
            return [];
        }
    }

    // 构造表格行
    renderWeekdayRow = weekday => {
        const getTD = this.getMealsTD;
        const weekdaysName = ['一', '二', '三', '四', '五', '六', '日'];
        const mealsName = ['ZD', 'ZC', 'DX', 'WC'];//早点，中餐，点心，晚餐
        // 新建时allMealsData为空[]
        const { allMealsData } = this.props;
        // 按周几排列菜品数据,空数组[]执行函数后为空对象{}
        const mealsSortedByWeekday = sortMealsData(allMealsData, 'zj');
        // 再把其中一天的数据按餐次进行排序，不一定每天都有数据，此时取默认值{}
        const oneDayMealsSorted = mealsSortedByWeekday[weekday] != null
            ? sortMealsData(mealsSortedByWeekday[weekday], 'mealTimes') : {};
        return (
            // 表示一星期中某一天的行, 没有数据为但有按钮空行，
            <tr key={weekday}>
                {/* 表示星期几的单元格 */}
                <td>{weekdaysName[weekday * 1 - 1]}</td>
                {/* 渲染出早中晚餐单元格，有数据展示，没数据显示+按钮 */}
                {mealsName.map(mealName => {
                    //如果当餐有数据，计算单元格的内容
                    const oneMeal = oneDayMealsSorted[mealName] != null
                        ? getTD(oneDayMealsSorted[mealName])
                        : [];
                    return (
                        <td key={mealName} onClick={e => this.handleShowModal(e, weekday, mealName)}>
                            {oneMeal}
                            {<Button className={styles.addBtn} type='dashed'>+添加</Button>}
                        </td>
                    )
                })}
            </tr>
        )
    }

    /**
    * 根据是否图片模式，是否显示配料详情来返回每个单元格中的内容
    * @param{array} dishes 每一餐的菜品数据,有可能未定义
    * @param{boolean} imgMode 是否图片模式
    * @param{boolean} showDetail 是否显示配料详情
    */
    getMealsTD = (meals = []) => {
        if (meals.length) {// 如果当前餐次有作安排
            return (<ul>
                {meals.map((item, index) => {
                    // 防止报错，菜品信息数据
                    const viewFood = item.viewFood || {};
                    // li负责展示每一个菜品
                    return (
                        <li key={index} >
                            <span className={styles.dishName}>{viewFood.foodName}</span>
                            {/* 自己加的悬浮时会显示删除按钮 */}
                            <ul id={item.foodId} className={styles.actionsWrap}>
                                <li flag='0' className={styles.changeBtn}>更换</li>
                                <li flag='-1' className={styles.deleteBtn}>删除</li>
                            </ul>
                        </li>
                    )
                })}
            </ul>)
        }
    }

    render() {
        const {
            className,
            // 选菜modal数据
            dishesData,
        } = this.props;
        const { mealTimes, zj } = this.state;
        const clsString = classNames(styles.arrangeDishes, className);
        // 简洁显示星期几
        const weekdayNum = ['1', '2', '3', '4', '5', '6', '7'];
        return (
            <div className={clsString}>
                {/* 排餐表格 */}
                <table className={styles.arrangeDisthTable} >
                    <thead>
                        <tr>
                            <th>周</th><th>早餐</th><th>中餐</th><th>点心</th><th>晚餐</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* 周一到周日都调用一下方法生成表格行 */}
                        {weekdayNum.map(weekday =>
                            this.renderWeekdayRow(weekday)
                        )}
                    </tbody>
                </table>
                {/* 弹出的选菜/或选食材modal */}
                <SelectDishes
                    // modal的显示属性
                    visible={this.state.showModal}
                    // 隐藏modal的方法
                    handleHideModal={this.hideModal}
                    // 菜品数据
                    dishesData={dishesData}
                    // 获取菜品方法
                    getDishes={this.getDishList}
                    // 选择类别下拉框时的回调
                    doFilter={this.handlFetchDishes}
                    // 关闭标签时的回调
                    changeArrangedMeals={this.changeArrangedMeals}
                    // 早/中/晚/点心
                    mealTimes={mealTimes}
                    // 周几
                    zj={zj}
                    // 当前周次的某餐次中菜品数据
                    currTDMeals={this.getCurrTDMeals()}
                />
            </div>
        )
    }
}

