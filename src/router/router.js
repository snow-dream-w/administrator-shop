import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'manger',
      component: () => import(/* webpackChunkName: "about" */ '@/views/Manger.vue'),
    },
    {
      path: '/order',
      name: 'order',
      component: () => import(/* webpackChunkName: "about" */ '@/views/Order/Order.vue')
    },
    {
      path: '/orderDetail',
      name: 'orderDetail',
      component: () => import(/* webpackChunkName: "about" */ '@/views/Order/OrderDetail.vue')
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
          component: () => import(/* webpackChunkName: "about" */ '@/views/Goods/GoodsView.vue')
        }, {
          path: 'orderManger',
          name: 'orderManger',
          component: () => import(/* webpackChunkName: "about" */ '@/views/Order/OrderManger.vue')
        }, {
          path: 'goodsInfo',
          name: 'goodsInfo',
          component: () => import(/* webpackChunkName: "about" */ '@/views/Goods/GoodsInfo.vue')
        }
      ]
    },
  ]
})
