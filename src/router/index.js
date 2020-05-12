import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Album from '@/components/Album'
import Seach from '@/components/Seach'

import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueWechatTitle)

Vue.use(Router)

export default new Router({
  // mode:'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: {
        title: '首页 - JAY粉丝俱乐部'
      }
    },
    {
      path: '/album',
      name: 'Album',
      component: Album,
      meta: {
        title: '专辑 - JAY粉丝俱乐部'
      }
    },
    {
      path: '/seach',
      name: 'Seach',
      component: Seach,
      meta: {
        title: '搜索 - JAY粉丝俱乐部'
      }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
