<template>
  <div class="shop-info">
    <div class="title-text">欢迎来到travel life 商家系统</div>
    <div class="header-container">
      <span>{{ title }}</span>
      <button @click="addShop">新增商店</button>
    </div>
    <table>
      <thead>
        <tr>
          <th>商店名称</th>
          <th>商店状态</th>
          <th>商店信息</th>
          <th>商品管理</th>
          <th>类别管理</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(shop, index) in shopList" :key="index">
          <td>{{ shop.shopName }}</td>
          <td>{{ shop.advice }}</td>
          <td><button @click="goToShopDetail(shop.shopId)">进入</button></td>
          <td><button @click="goToProductManage(shop.shopId)">进入</button></td>
          <td><button @click="goToCategoryManage(shop.shopId)">进入</button></td>
        </tr>
      </tbody>
    </table>
    <div class="footer-container">
      <button @click="logOut">退出系统</button>
      <button @click="modifyAccount">修改密码</button>
    </div>
  </div>
</template>

<script >
import { defineComponent } from 'vue'
import { getRequest } from '../request/index'
import { SHOP_LIST_PATH } from '../config/requestConfig'
import router from '../router/index'
import store from '../stores/index'
import { ShopListResult } from '../../models/ShopListResult'

export default defineComponent({
    data () {
        return {
            title: "",
            shopList: [],
            user: {}
        }
    },
    mounted () {
        // 页面加载时，获取页面数据
        this.getListData()
    },
    methods: {
        async getListData () {
            const data = ShopListResult.from(await getRequest(SHOP_LIST_PATH))
            this.shopList = data.shopList
            this.user = data.user
            this.title = "您好！" + data.user.name
        },
        addShop () {
            //添加商店,商店编辑页的shopId设置为可选，使用商店编辑页作为商店新增页
            router.push({ name: 'shopdetail' })
        },
        goToShopDetail (shopId) {
            //商店编辑页
            router.push({ name: 'shopdetail', params: { shopId } })
        },
        goToProductManage (shopId) {
            //商品管理页
            router.push({ name: 'productmanagement', params: { shopId } })
        },
        goToCategoryManage (shopId) {
            //类别管理页
            router.push({ name: 'category', params: { shopId } })
        },
        async logOut () {
            //登出派发一个action到store，清除cookie中和store中的token
            await store.dispatch('common/logout')
            //重定向到登录页
            router.push({ name: 'login' })
        },
        modifyAccount () {
            //跳转密码修改页
            router.push({ name: 'modifypassword' })
        }
    }
})
</script>
<style scoped>
.shop-info {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}
</style>