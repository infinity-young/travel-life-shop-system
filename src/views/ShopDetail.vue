<template>
  <span>Shop Detail</span>
</template>
<script>
import { defineComponent } from 'vue'
import { getRequest } from '../request/index'
import { SHOP_INFO_PATH, SHOP_PATH } from '../config/requestConfig'

export default defineComponent({
  props: {
    shopId: {
      type: String,
      required: true
    }
  },
  setup() {
    console.log('===fdfdf=d===')
  },
  data() {
    return {
      shop: {},
      areaList: [],
      shopCategoryList: []
    }
  },
  mounted() {
    // 页面加载的时候获取页面相关数据
    this.getShopInfo()
    this.getShop()
    // 获取验证码信息
  },
  methods: {
    //获取店铺基本
    async getShopInfo() {
      const data = await getRequest(SHOP_INFO_PATH)
      this.shop = data?.shop
      this.areaList = data?.areaList
    },
    //获取店铺信息
    async getShop() {
      const params = {
        shopId: this.props.shopId
      }
      const data = await getRequest(SHOP_PATH, params)
      this.shopCategoryList = data?.shopCategoryList
    }
  }
})
</script>
<style scoped>
</style>
