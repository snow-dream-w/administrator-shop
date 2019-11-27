import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'manager',
      meta: {
        requireAuth: false
      },
      component: () => import('@/views/Manager.vue')
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        requireAuth: false
      },
      component: () => import('@/views/LoginDialog.vue')
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
      path: '/manager',
      name: 'manager',
      component: () => import('@/views/Manager.vue'),
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
router.beforeEach((to, from, next) => {
  if (!navigator.onLine) {
    alert('网络未连接，请连接网络重试！')
    return;
  }
  if (to.meta.requireAuth !== false) {
    axios.get('/user/check_login').then(result => {
      if (result.data.status === 1) {
        next()
      } else {
        next('/login')
      }
    })
  } else {
    next()
  }
});
export default router