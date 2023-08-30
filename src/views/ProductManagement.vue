<template>
  <span>product management</span>
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
          <button @click="editProduct(product.productId)">编辑</button>
          <button @click="offProduct(product.productId)">下架</button>
          <button @click="previewProduct(product.productId)">预览</button>
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
import { PRODUCT_LIST_PATH } from '../config/requestConfig'
import { getRequest } from '../request/index'

export default defineComponent({
  data() {
    return {
      productList: [
        {
          productId: 1,
          productName: '海景套房',
          productDesc: '豪华海景房，远眺大海',
          imgAddr: 'upload/item/shop/1/2023060201480413747.jpg',
          normalPrice: '2000',
          promotionPrice: '1090',
          priority: 90,
          createTime: null,
          lastEditTime: 1685641685000,
          enableStatus: 1,
          productImgList: null,
          productCategory: null,
          shop: null
        },
        {
          productId: 10,
          productName: '海景大床房',
          productDesc: '海景大床房可入住2人',
          imgAddr: 'upload/item/shop/1/2023060201471257974.jpg',
          normalPrice: '1000',
          promotionPrice: '900',
          priority: 20,
          createTime: 1681010805000,
          lastEditTime: 1685641633000,
          enableStatus: 1,
          productImgList: null,
          productCategory: null,
          shop: null
        },
        {
          productId: 60,
          productName: '海景双床房',
          productDesc: '海景双床房，含早',
          imgAddr: 'upload/item/shop/1/2023060501020067386.jpg',
          normalPrice: '900',
          promotionPrice: '800',
          priority: 20,
          createTime: 1685898121000,
          lastEditTime: 1685898121000,
          enableStatus: 1,
          productImgList: null,
          productCategory: null,
          shop: null
        }
      ],
      count: [],
      shopId: null
    }
  },
  mouted() {
    //页面初始化的时候请求页面数据,从store中获取
    this.shopId = this.$route.params.shopId
    console.log('===ss======' + JSON.stringify(this.shopId))
  },
  methods: {
    //
    // async getProductList() {
    //   const data = await getRequest(PRODUCT_LIST_PATH)
    // }
    //点击编辑
    editProduct(productId) {
      //跳转商品编辑页
      console.log(
        '=========productId=' + JSON.stringify(productId) + '----' + JSON.stringify(this.shopId)
      )
      router.push({ name: 'productdetail', params: { productId: productId, shopId: this.shopId } })
    },
    //点击下架
    offProduct(productId) {
      //
    },
    //点击预览
    previewProduct(productId) {
      //跳转产品预览页
      router.push({ name: 'productpreview', params: { productId: productId } })
    },
    //点击返回
    goBack() {
      //
    },
    //点击新增商品,shopId似乎也应该传进来。
    add() {
      //
    }
  }
})
</script>
<style scoped>
</style>
