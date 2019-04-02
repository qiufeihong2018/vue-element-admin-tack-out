import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const addShop = r => require.ensure([], () => r(require('@/page/dataAdd/addShop')), 'addShop');
const addGoods = r => require.ensure([], () => r(require('@/page/dataAdd/addGoods')), 'addGoods');
const userManage = r => require.ensure([], () => r(require('@/page/manage/userManage')), 'userManage');
const shopManage = r => require.ensure([], () => r(require('@/page/manage/shopManage')), 'shopManage');
const foodManage = r => require.ensure([], () => r(require('@/page/manage/foodManage')), 'foodManage');
const orderMange = r => require.ensure([], () => r(require('@/page/manage/orderMange')), 'orderMange');
const adminManage = r => require.ensure([], () => r(require('@/page/manage/adminManage')), 'adminManage');
const user = r => require.ensure([], () => r(require('@/page/picture/user')), 'user');
const map = r => require.ensure([], () => r(require('@/page/picture/map')), 'map')
const merchants = r => require.ensure([], () => r(require('@/page/picture/merchants')), 'merchants')
const food = r => require.ensure([], () => r(require('@/page/picture/food')), 'food')
const menu = r => require.ensure([], () => r(require('@/page/picture/menu')), 'menu')
const admin = r => require.ensure([], () => r(require('@/page/picture/admin')), 'admin')
const adminSet = r => require.ensure([], () => r(require('@/page/adminSet')), 'adminSet');
const explain = r => require.ensure([], () => r(require('@/page/explain')), 'explain');

const routes = [
    {
        path: '/',
        component: login
    },
    {
        path: '/manage',
        component: manage,
        name: '',
        children: [{
            path: '',
            component: home,
            meta: [],
        }, {
            path: '/addShop',
            component: addShop,
            meta: ['添加数据', '添加商铺'],
        }, {
            path: '/addGoods',
            component: addGoods,
            meta: ['添加数据', '添加商品'],
        }, {
            path: '/userManage',
            component: userManage,
            meta: ['数据管理', '买家管理'],
        }, {
            path: '/shopManage',
            component: shopManage,
            meta: ['数据管理', '卖家管理'],
        }, {
            path: '/foodManage',
            component: foodManage,
            meta: ['数据管理', '菜单管理'],
        }, {
            path: '/orderMange',
            component: orderMange,
            meta: ['数据管理', '订单管理'],
        }, {
            path: '/adminManage',
            component: adminManage,
            meta: ['数据管理', '管理员管理'],
        }, {
            path: '/user',
            component: user,
            meta: ['图表', '买家分布'],
        }, {
            path: '/merchants',
            component: merchants,
            meta: ['图表', '商家分布']
        }, {
            path: '/food',
            component: food,
            meta: ['图表', '食品分类']
        }, {
            path: '/menu',
            component: menu,
            meta: ['图表', '订单分布']
        }, {
            path: '/admin',
            component: admin,
            meta: ['图表', '管理员分布']
        }, {
            path: '/adminSet',
            component: adminSet,
            meta: ['设置', '管理员设置'],
        }, {
            path: '/explain',
            component: explain,
            meta: ['说明', '说明'],
        }]
    }
]

export default new Router({
    routes,
    strict: process.env.NODE_ENV !== 'production',
})
