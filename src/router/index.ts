import { createRouter, createWebHistory } from 'vue-router'
import ShopDetail from '../views/ShopDetail.vue'
import ShopCategory from '../views/ShopCategory.vue'
import ProductManagement from '../views/ProductManagement.vue'
import ProductPreview from '../views/ProductPreview.vue'
import ProductDetail from '../views/ProductDetail.vue'
import ModifyPassword from '../views/ModifyPassword.vue'
import Cookies from 'js-cookie'


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
      path: '/shopdetail/:shopId?',
      name: 'shopdetail',
      component:ShopDetail
    },
    {
      path:'/category/:shopId',
      name:'category',
      component:ShopCategory
    },
    {
      path:'/productmanagement/:shopId',
      name:'productmanagement',
      component:ProductManagement
    },
    {
      path:'/productpreview/:productId',
      name:'productpreview',
      component:ProductPreview
    },
    {
      path:'/productdetial/:shopId/:productId?',
      name:'productdetail',
      component:ProductDetail
    },
    {
      path:'/modifypassword',
      name:'modifypassword',
      component:ModifyPassword
    }
  ]
})

router.beforeEach((to, from, next) => {//to和from虽然没有用到，但是js没有函数签名，为了获得正确的next函数，需要保留to和from的值。
  //从cookie中获取token，如果没有token则将强制用户登录，
  // 检查用户是否已登录
  const  token = Cookies.get('token')
  const isAuthenticated = token?.length>0
  if (to.name !== 'login' && !isAuthenticated) {//为了防止死锁需要添加to.name !== 'login' && 
    // 如果用户尚未登录并且试图访问非登录页面，则重定向到登录页面
    next({ name: 'login' })
  } else {
    // 否则，允许他们继续他们的路由
    next()
  }
})

export default router
