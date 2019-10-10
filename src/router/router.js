import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
    },
    {
      path: '/car',
      name: 'car',
      component: () => import(/* webpackChunkName: "about" */ '@/views/Car.vue')
    },
    {
      path: '/order',
      name: 'order',
      component: () => import(/* webpackChunkName: "about" */ '@/views/Order.vue')
    },
    {
      path: '/orderDetail',
      name: 'orderDetail',
      component: () => import(/* webpackChunkName: "about" */ '@/views/OrderDetail.vue')
    },
    {
      path: '/manger',
      name: 'manger',
      component: () => import(/* webpackChunkName: "about" */ '@/views/Manger.vue'),
      redirect: '/manger/goodsView',
      children: [
        {
          path: 'goodsView',
          name: 'goodsView',
          component:() => import(/* webpackChunkName: "about" */ '@/views/GoodsView.vue')
        },{
          path: 'orderManger',
          name: 'orderManger',
          component:() => import(/* webpackChunkName: "about" */ '@/views/OrderManger.vue')
        },{
          path: 'goodsInfo',
          name: 'goodsInfo',
          component: () => import(/* webpackChunkName: "about" */ '@/views/GoodsInfo.vue')
        }
      ]
    },
    
  ]
})
