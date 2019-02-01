import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const addShop = r => require.ensure([], () => r(require('@/page/addShop')), 'addShop');
const addGoods = r => require.ensure([], () => r(require('@/page/addGoods')), 'addGoods');
const userList = r => require.ensure([], () => r(require('@/page/userList')), 'userList');
const shopList = r => require.ensure([], () => r(require('@/page/shopList')), 'shopList');
const foodList = r => require.ensure([], () => r(require('@/page/foodList')), 'foodList');
const orderList = r => require.ensure([], () => r(require('@/page/orderList')), 'orderList');
const adminList = r => require.ensure([], () => r(require('@/page/adminList')), 'adminList');
const visitor = r => require.ensure([], () => r(require('@/page/visitor')), 'visitor');
const map = r => require.ensure([], () => r(require('@/page/map')), 'map')
const merchants = r => require.ensure([], () => r(require('@/page/merchants')), 'merchants')
const food = r => require.ensure([], () => r(require('@/page/food')), 'food')
const menu = r => require.ensure([], () => r(require('@/page/menu')), 'menu')
const admin = r => require.ensure([], () => r(require('@/page/admin')), 'admin')


const newMember = r => require.ensure([], () => r(require('@/page/newMember')), 'newMember');
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
            path: '/userList',
            component: userList,
            meta: ['数据管理', '买家管理'],
        }, {
            path: '/shopList',
            component: shopList,
            meta: ['数据管理', '卖家管理'],
        }, {
            path: '/foodList',
            component: foodList,
            meta: ['数据管理', '菜单管理'],
        }, {
            path: '/orderList',
            component: orderList,
            meta: ['数据管理', '订单管理'],
        }, {
            path: '/adminList',
            component: adminList,
            meta: ['数据管理', '管理员管理'],
        }, {
            path: '/visitor',
            component: visitor,
            meta: ['图表', '用户分布'],
        }, {
            path: '/map',
            component: map,
            meta: ['图表', '地图']
        }, {
            path: '/merchants',
            component: merchants,
            meta: ['图表', '商家分布']
        }, {
            path: '/newMember',
            component: newMember,
            meta: ['图表', '用户数据'],
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
