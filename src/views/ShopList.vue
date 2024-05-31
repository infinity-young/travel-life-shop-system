<template>
  <div class="shop-info">
    <div class="title-text">欢迎来到travel life 商家系统</div>
    <div class="header-container">
      <span>{{ title }}</span>
      <button @click="addShop">新增店铺</button>
    </div>
    <table>
      <thead>
        <tr>
          <th>商店名称</th>
          <th>商店状态</th>
          <th>商铺信息</th>
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
import { ShopListResult } from '../../models/ShopListResult.ts'

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
            //添加店铺,店铺编辑页的shopId设置为可选，使用店铺编辑页作为店铺新增页
            router.push({ name: 'shopdetail' })
        },
        goToShopDetail (shopId) {
            //店铺编辑页
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
.header-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

table {
  width: 100%;
  text-align: center;
  background-color: rgb(215, 218, 221);
  border-radius: 12px;
  border-spacing: 0; /* 用于替代 border-collapse: collapse; */
  overflow: hidden; /* 确保圆角被显示 */
}

th,
td {
  padding: 10px;
  border: 1px solid #ccc;
}

th {
  background-color: #aeadad;
}

/* 针对表格最后一行的第一个和最后一个单元格设置圆角 */
tr:last-child td:first-child {
  border-bottom-left-radius: 12px;
}

tr:last-child td:last-child {
  border-bottom-right-radius: 12px;
}

.footer-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
}
</style>