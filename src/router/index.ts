import { createRouter, createWebHistory } from 'vue-router'
import ShopDetail from '../views/ShopDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/',
      name: 'shoplist',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ShopList.vue')
    },
    {
      path: '/shopdetail/:shopId',
      name: 'shopdetail',
      component:ShopDetail
    }
  ]
})

export default router
