import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from '../layouts/layout/Layout'

Vue.use(Router)

const _import = file => () => import('@/pages/' + file + '.vue')

export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('error-page/404'), hidden: true },
  {
    path: '/',
    component: Layout,
    hidden: true,
    redirect: '/main'
  },
  {
    path: '/checkbox',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'checkbox',
        component: _import('checkbox/index'),
        meta: { title: 'checkbox', icon: 'example' }
      }
    ]
  },
  {
    path: '/main',
    component: Layout,
    children: [
      {
        path: 'hall',
        name: 'hall',
        component: _import('Management/hall'),
        meta: { title: '管理大厅', icon: 'example' }
      }
    ]
  },
  {
    path: '/functional',
    component: Layout,
    meta: { title: '功能中心', icon: 'example' },
    children: [
      {
        path: 'center',
        name: 'Function',
        component: _import('Management/hall'),
        meta: { title: '功能中心', icon: 'example' }
      }
    ]
  },

  {
    path: '/extraction',
    component: Layout,
    redirect: '/extraction/single',
    name: 'Extraction',
    meta: {
      title: '文档抽取',
      icon: 'nested'
    },
    children: [
      {
        path: 'single',
        name: 'Single',
        component: _import('Management/hall'),
        meta: { title: '单文件抽取', icon: 'form' }
      },
      {
        path: 'multiple',
        name: 'Multiple',
        component: _import('Management/hall'),
        meta: { title: '批量抽取', icon: 'form' }
      },
      {
        path: 'scanned',
        name: 'Scanned',
        component: _import('Management/hall'),
        meta: { title: '扫描件抽取', icon: 'form' }
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
