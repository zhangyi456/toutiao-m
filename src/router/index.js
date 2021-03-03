import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    // name: 'layout',
    component: () => import('@/views/layout/index.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/home/index.vue')
      },
      {
        path: 'qa',
        name: 'qa',
        component: () => import('@/views/qa/index.vue')
      },
      {
        path: 'vidio',
        name: 'vidio',
        component: () => import('@/views/vidio/index.vue')
      },
      {
        path: 'my',
        name: 'my',
        component: () => import('@/views/my')
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search/index.vue')
  },
  {
    path: '/article/:articleId',
    name: 'articles',
    component: () => import('@/views/article/index.vue'),
    // porps: true
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
