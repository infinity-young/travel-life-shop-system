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
import store from '../stores/index'

export default defineComponent({
    data () {
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
    // 正确的写法应该是这样
    //   setup() {
    //   const shopList = ref([]); // 使用 ref 创建一个响应式数组，ref从Vue中导出。

    //   // 定义一个异步函数来获取数据
    //   const fetchData = async () => {
    //     try {
    //       const response = await getRequest('/api/shop-list');
    //       shopList.value = response.data; // 假设响应的数据在 data 字段中
    //     } catch (error) {
    //       console.error('请求失败:', error);
    //     }
    //   };

    //   // 调用异步函数
    //   fetchData();

    //   // 返回响应式数据供模板使用
    //   return {
    //     shopList
    //   };
    // }
    mounted () {
        // 页面加载时，获取页面数据
        this.getListData()
    },
    methods: {
        async getListData () {
            const data = await getRequest(SHOP_LIST_PATH)
            this.shopList = data?.data?.shopList
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