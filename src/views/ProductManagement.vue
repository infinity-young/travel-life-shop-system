<template>
  <span>product management</span>
  <BackModel title="商品管理" />
  <table>
    <thead>
      <tr>
        <th>商品类别</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in productList" :key="product.productId">
        <td>{{ product.productName }}</td>
        <td>
          <button @click="editProduct(product.productId)" class="editable-button">编辑</button>
          <button
            @click="offProduct(product.productId)"
            class="editable-button"
            v-if="product.enableStatus == 1"
          >
            下架
          </button>
          <button
            @click="onProduct(product.productId)"
            class="editable-button"
            v-if="product.enableStatus == 0"
          >
            上架
          </button>
          <button @click="previewProduct(product.productId)" class="editable-button">预览</button>
        </td>
      </tr>
    </tbody>
  </table>
  <div>
    <button @click="goBack">返回</button>
    <button @click.prevent="add">新增</button>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import router from '../router/index'
import { PRODUCT_LIST_PATH, PRODUCT_MODIFY_PATH } from '../config/requestConfig'
import { postRequest } from '../request/index'
import BackModel from '../components/BackModel.vue'
import store from '../stores/index'

export default defineComponent({
  components: {
    BackModel
  },
  data() {
    return {
      count: [],
      shopId: null,
      productList: [],
      buttonStatus: null
    }
  },
  mounted() {
    //页面初始化的时候请求页面数据,从store中获取
    this.shopId = this.$route.params.shopId
    this.getProductList()
  },
  methods: {
    async fetchToken(url) {
      await store.dispatch('common/fetchToken', { url: url })
    },
    //
    async getProductList() {
      const url = PRODUCT_LIST_PATH + '?shopId=' + this.shopId
      await store.dispatch('shopList/fetchProductList', { url: url })
      const productList = store.getters['shopList/getProductList']
      this.productList = productList
      // this.count = data?.data?.count
    },
    //点击编辑
    editProduct(productId) {
      //跳转商品编辑页
      router.push({ name: 'productdetail', params: { productId: productId, shopId: this.shopId } })
    },
    //点击下架
    offProduct(productId) {
      //以formdata的形式提交数据
      const data = {
        productId: productId,
        enableStatus: 0
      }
      const formData = new FormData()
      formData.append('productStr', JSON.stringify(data))
      //添加状态信息
      formData.append('statusChange', true)
      const url = PRODUCT_MODIFY_PATH + '?shopId=' + this.shopId
      postRequest(url, formData)
    },
    onProduct(productId) {
      //以formdata的形式提交数据
      const data = {
        productId: productId,
        enableStatus: 1
      }
      const formData = new FormData()
      formData.append('productStr', JSON.stringify(data))
      //添加状态信息
      formData.append('statusChange', true)
      const url = PRODUCT_MODIFY_PATH + '?shopId=' + this.shopId
      postRequest(url, formData)
    },
    //点击预览
    previewProduct(productId) {
      //跳转产品预览页
      router.push({ name: 'productpreview', params: { productId: productId } })
    },
    //点击返回
    goBack() {
      this.$router.back()
    },
    //点击新增商品
    add() {
      router.push({ name: 'productdetail', params: { shopId: this.shopId } })
    }
  }
})
</script>
<style scoped>
table {
  width: 100%;
  table-layout: fixed;
}
td,
th {
  padding: 10px;
  text-align: center;
}
.editable-button {
  margin-left: 10px;
  margin-right: 10px;
}
</style>
