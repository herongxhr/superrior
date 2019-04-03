import memoizeOne from 'memoize-one';
import isEqual from 'lodash/isEqual';
import { formatMessage } from 'umi/locale';
import Authorized from '@/utils/Authorized';
import { menu } from '../defaultSettings';

const { check } = Authorized;

// Conversion router to menu.
// 将 router.config.js 中的路由配置数据转化成菜单数据
// 其中的子路由变成了菜单中的children，即子菜单
function formatter(data, parentAuthority, parentName) {
    return data
        .map(item => {
            // 没有name或没有path属性都不是菜单数据
            if (!item.name || !item.path) {
                return null;
            }
            let locale = 'menu';
            if (parentName) {
                locale = `${parentName}.${item.name}`;
            } else {
                locale = `menu.${item.name}`;
            }
            // 如果禁用本地化，直接使用item.name
            // 否则要本地化一下
            const name = menu.disableLocal
                ? item.name
                : formatMessage({ id: locale, defaultMessage: item.name });
            const result = {
                ...item,
                name,
                locale,
                authority: item.authority || parentAuthority,
            };
            if (item.routes) {// 递归
                const children = formatter(item.routes, item.authority, locale);
                // Reduce memory usage
                result.children = children;
            }
            delete result.routes;
            return result;
        })
        .filter(item => item);
}

const memoizeOneFormatter = memoizeOne(formatter, isEqual);

/**
 * get SubMenu or Item
 * 获取子菜单或子菜单项
 */
const getSubMenu = item => {
    // doc: add hideChildrenInMenu
    if (item.children && !item.hideChildrenInMenu && item.children.some(child => child.name)) {
        return {
            ...item,
            children: filterMenuData(item.children), // eslint-disable-line
        };
    }
    return item;
};

/**
 * filter menuData
 * 过滤菜单数据数组
 * 1.如果空数据返回空数组
 * 2.如果菜单项没有name属性也不要
 * 3.菜单项是隐藏的也不要
 */
const filterMenuData = menuData => {
    if (!menuData) {
        return [];
    }
    return menuData
        .filter(item => item.name && !item.hideInMenu)
        .map(item => check(item.authority, getSubMenu(item)))
        .filter(item => item);
};
/**
 * 获取面包屑映射
 * 主要就是以对象键值对形式建立
 * path属性与数组项自身的一一对应
 * @param {Object} menuData 菜单配置
 */
const getBreadcrumbNameMap = menuData => {
    const routerMap = {};
    const flattenMenuData = data => {
        data.forEach(menuItem => {
            if (menuItem.children) {
                flattenMenuData(menuItem.children);
            }
            // Reduce memory usage
            routerMap[menuItem.path] = menuItem;
        });
    };
    flattenMenuData(menuData);
    return routerMap;
};

const memoizeOneGetBreadcrumbNameMap = memoizeOne(getBreadcrumbNameMap, isEqual);

export default {
    namespace: 'menu',
    state: {
        menuData: [],
        routerData: [],
        breadcrumbNameMap: {},
    },

    effects: {
        *getMenuData({ payload }, { put }) {
            const { routes, authority } = payload;
            const originalMenuData = memoizeOneFormatter(routes, authority);
            const menuData = filterMenuData(originalMenuData);
            const breadcrumbNameMap = memoizeOneGetBreadcrumbNameMap(originalMenuData);
            yield put({
                type: 'save',
                payload: { menuData, breadcrumbNameMap, routerData: routes },
            });
        },
    },

    reducers: {
        save(state, action) {
            return {
                ...state,
                ...action.payload,
            };
        },
    },
};
