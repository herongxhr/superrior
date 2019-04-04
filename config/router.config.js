export default [
    {
        path: '/',
        component: '../layouts/BasicLayout',
        routes: [
            { path: '/', redirect: '/index' },
            { // 工作台
                path: '/index',
                name: 'dashboard',
                icon: 'dashboard',
                component: './Index'
            },
            { // 菜单中心
                path: '/menu-center',
                name: 'menucenter',
                icon: 'bars',
                routes: [
                    { path: '/menu-center', redirect: '/menu-center/menu-list' },
                    { // 菜单中心
                        path: './menu-list',
                        name: 'menulist',
                        hideInMenu: true,
                        component: './MenuCenter/MenuList'
                    },
                    { // 菜单模板
                        path: './menu-template',
                        name: 'menutemplate',
                        hideInMenu: true,
                        component: './MenuCenter/MenuTemplate'
                    },
                    { // 菜单详情
                        path: './menu-list/details',
                        name: 'menudetails',
                        hideInMenu: true,
                        component: './MenuCenter/MenuDetails'
                    },
                    { // 新建菜单
                        path: './menu-list/custom',
                        name: 'menucustom',
                        hideInMenu: true,
                        component: './MenuCenter/CustomMenu'
                    },
                    { // 编辑菜单
                        path: './menu/update',
                        name: 'menuupdate',
                        hideInMenu: true,
                        component: './MenuCenter/CustomMenu'
                    },
                    { // 模板详情
                        path: './menu-template/details',
                        name: 'templatedetails',
                        hideInMenu: true,
                        component: './MenuCenter/TemplateDetails'
                    },
                    { // 新建模板
                        path: './menu-template/custom',
                        name: 'templatecustom',
                        hideInMenu: true,
                        component: './MenuCenter/CustomTemplate'
                    },
                    { // 编辑模板
                        path: './menu-template/update',
                        name: 'templateupdate',
                        hideInMenu: true,
                        component: './MenuCenter/CustomTemplate'
                    },

                ]
            },
            { // 菜品管理
                path: '/dishes',
                name: 'dishes',
                icon: 'dashboard',
                routes: [
                    { path: '/dishes', redirect: '/dishes/my-dishes' },
                    { // 我的菜品
                        path: '/dishes/my-dishes',
                        component: './Dishes/MyDishes'
                    },
                    { // 平台菜品
                        path: '/dishes/ops',
                        component: './Dishes/OPS'
                    },
                    { // 菜品详情
                        path: '/dishes/my-dishes/details',
                        component: './Dishes/DishDetails'
                    },
                    { // 新增菜品
                        path: '/dishes/my-dishes/custom',
                        component: './Dishes/Custom'
                    },
                    { // 编辑菜品
                        path: '/dishes/my-dishes/update',
                        component: './Dishes/Custom'
                    },
                ]
            },
            { // 采购定价
                path: '/list-price ',
                name: 'listprice',
                icon: 'dashboard',
                routes: [
                    {
                        // 定价单
                        path: '/list-price/price-list',
                        component: './ListPrice/PriceList',
                    },
                    {
                        // 待收录
                        path: '/list-price/will-collect',
                        component: './ListPrice/WillCollect',
                    },
                    {
                        // 采购目录
                        path: '/list-price/collect-list',
                        component: './ListPrice/CollectList',
                    },
                    {
                        // 新建定价单
                        path: '/list-price/price-list/new',
                        component: './ListPrice/NewPriceList',
                    },
                    {
                        // 定价单详情
                        path: '/list-price/price-list/details',
                        component: './ListPrice/PriceListDetails',
                    }
                ],
            },
            // {
            //     component: '404',
            // },
        ]
    }
];