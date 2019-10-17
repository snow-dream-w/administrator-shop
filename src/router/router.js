import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/manger',
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
          component:() => import(/* webpackChunkName: "about" */ '@/views/goods/GoodsView.vue')
        },{
          path: 'orderManger',
          name: 'orderManger',
          component:() => import(/* webpackChunkName: "about" */ '@/views/order/OrderManger.vue')
        },{
          path: 'goodsInfo',
          name: 'goodsInfo',
          component: () => import(/* webpackChunkName: "about" */ '@/views/goods/GoodsInfo.vue')
        }
      ]
    },
    
  ]
})
