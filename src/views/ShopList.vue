<template>
  <div class="shop-info">
    <div class="header-container">
      <span>你好</span>
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
          <td @click="goToShopDetail(shop.shopId)">进入</td>
          <td @click="goToProductManage(shop.shopId)">进入</td>
          <td @click="goToCategoryManage(shop.shopId)">进入</td>
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

export default defineComponent({
  data() {
    return {
      shopList: [],
      user: {}
    }
  },
  //此处栽了一个跟头，留着
  // setup() {
  //   console.log('===dd====' + store.getters['common/getToken'])

  //   const shopList1 = getRequest(SHOP_LIST_PATH)
  //   console.log('===shoplist======' + JSON.stringify(shopList1))
  //   // const data = await getRequest(SHOP_LIST_PATH)

  //   // console.log('======' + JSON.stringify(shopList))
  //   // const data = ref(null)

  //   // const fetchData = async () => {
  //   //   const listData = await getRequest(SHOP_LIST_PATH)
  //   //   data.value = listData
  //   // }

  //   // fetchData()

  //   return {
  //     // data
  //     shopList1
  //     // user: {},
  //     // shopName: '',
  //     // shopAddress: '',
  //     // shopList: [
  //     //   { name: '店铺1', address: '地址1' },
  //     //   { name: '店铺2', address: '地址2' },
  //     //   { name: '店铺3', address: '地址3' },
  //     //   { name: '店铺4', address: '地址4' },
  //     //   { name: '店铺5', address: '地址5' }
  //     // ]
  //   }
  // },
  mounted() {
    // 页面加载时，获取页面数据
    this.getListData()
  },
  methods: {
    async getListData() {
      const data = await getRequest(SHOP_LIST_PATH)
      this.shopList = data?.data?.shopList
    },
    addShop() {
      //添加店铺,店铺编辑页的shopId设置为可选，使用店铺编辑页作为店铺新增页
      router.push({ name: 'shopdetail' })
    },
    goToShopDetail(shopId) {
      //店铺编辑页
      router.push({ name: 'shopdetail', params: { shopId } })
    },
    goToProductManage(shopId) {
      //商品管理页
      console.log('=====gotoproductmange===')
      router.push({ name: 'productmanagement', params: { shopId } })
    },
    goToCategoryManage(shopId) {
      //类别管理页
      router.push({ name: 'category', params: { shopId } })
    },
    logOut() {
      //登出
      console.log('=====logout====')
    },
    modifyAccount() {
      //账号修改
      console.log('=====modifyAccount=====')
    }
  }
})
</script>
<style scoped>
.shop-info {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}
.header-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
}

table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ccc;
}

th {
  background-color: #9d2323;
}
.footer-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
}
</style>