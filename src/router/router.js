import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'manger',
      component: () => import('@/views/Manger.vue'),
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('@/views/Order/Order.vue')
    },
    {
      path: '/orderDetail',
      name: 'orderDetail',
      component: () => import('@/views/Order/OrderDetail.vue')
    },
    {
      path: '/manger',
      name: 'manger',
      component: () => import('@/views/Manger.vue'),
      redirect: '/manger/goodsView',
      children: [
        {
          path: 'goodsView/:type',
          name: 'goodsView',
          component: () => import('@/views/Goods/GoodsView.vue')
        }, {
          path: 'orderManger',
          name: 'orderManger',
          component: () => import('@/views/Order/OrderManger.vue')
        }, {
          path: 'goodsAdd',
          name: 'goodsAdd',
          component: () => import('@/views/Goods/GoodsAdd.vue')
        }
      ]
    },
  ]
})
