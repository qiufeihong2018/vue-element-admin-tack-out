import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from '../layouts/layout/Layout'

Vue.use(Router)

const _import = file => () => import('@/pages/' + file + '.vue')

export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('error/404'), hidden: true },
  {
    path: '/',
    component: Layout,
    hidden: true,
    redirect: '/lufei/index'
  },
  {
    path: '/lufei',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'lufei',
        component: _import('luFei/index'),
        meta: { title: 'lufei', icon: 'example' }
      }
    ]
  },
  {
    path: '/caomao',
    component: Layout,
    redirect: '/caomao/suolong',
    name: 'caomao',
    meta: {
      title: 'caomao',
      icon: 'nested'
    },
    children: [
      {
        path: 'suolong',
        name: 'suolong',
        component: _import('caomao/suolong'),
        meta: { title: 'suolong', icon: 'form' }
      },
      {
        path: 'qiaozhi',
        name: 'qiaozhi',
        component: _import('caomao/qiaozhi'),
        meta: { title: 'qiaozhi', icon: 'form' }
      },
      {
        path: 'qiaoba',
        name: 'qiaoba',
        component: _import('caomao/qiaoba'),
        meta: { title: 'qiaoba', icon: 'form' }
      },
      {
        path: 'namei',
        name: 'namei',
        component: _import('caomao/namei'),
        meta: { title: 'namei', icon: 'form' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  linkActiveClass: 'active-link',
  mode: 'history',
  routes: constantRouterMap
})
