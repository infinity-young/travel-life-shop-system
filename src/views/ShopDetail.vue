<template>
  <span>Shop Detail</span>
  <div>
    <form>
      <div>
        <label for="shopName">商铺名称：</label>
        <input type="text" id="shopName" v-model="shopName" />
      </div>
      <div>
        <label for="shopArea1">商铺分类：</label>
        <SelectModel
          :options="shopCategoryList"
          :selectedOption="shopCategory"
          v-on:update:selectedOption="selectedCategoryOptionChange"
        />
      </div>
      <div>
        <label for="shopArea">所属区域：</label>
        <SelectModel
          :options="areaList"
          :selectedOption="area"
          v-on:update:selectedOption="selectedAreaOptionChange"
        />
      </div>
      <div>
        <label for="shopAddr">详细地址：</label>
        <input type="text" id="shopAddr" v-model="shopAddr" />
      </div>
      <div>
        <label for="phone">联系电话：</label>
        <input type="text" id="phone" v-model="phone" />
      </div>
      <div>
        <label for="shopImage">缩略图：</label>
        <input type="file" id="shopImage" @change="handleImageChange" />
        <!-- <img :src="shop.shopImg" v-if="shop.shopImg" /> 是否需要添加展示模块-->
      </div>
      <div>
        <label for="shopDesc">店铺简介：</label>
        <input type="text" id="shopDesc" v-model="shopDesc" />
      </div>
      <div>
        <label for="shopDesc">验证码</label>
        <img :src="kaptchaUrl" />
        <input type="text" id="shopDesc" v-model="kaptchaInput" />
      </div>
      <button type="submit" @click.prevent="submitShop">提交</button>
    </form>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import { getRequest, getKaptchaRequest, postRequest } from '../request/index'
import { SHOP_INFO_PATH, SHOP_PATH, KAPTCHA_PATH, MODITY_SHOP_PATH } from '../config/requestConfig'
import SelectModel from '../components/SelectModel.vue'
import store from '../stores/index'

export default defineComponent({
  components: {
    SelectModel
  },
  data() {
    return {
      shop: {},
      areaList: [],
      shopCategoryList: [],
      shopId: null,
      shopName: '',
      shopDesc: '',
      shopAddr: '',
      phone: '',
      shopCategory: {},
      area: {},
      shopAreaId: '',
      kaptchaUrl: '',
      kaptchaCode: '',
      kaptchaInput: '',
      token: '',
      categorySelectedOption: ''
    }
  },
  mounted() {
    // 页面加载的时候获取页面相关数据
    this.shopId = this.$route.params.shopId
    this.getShopInfo()
    this.getShop()
    // 获取token信息 todo token解析及token提交相关
    // this.fetchToken()
    //获取验证码信息
    this.refreshkaptcha()
  },
  methods: {
    //获取店铺基本信息
    async getShopInfo() {
      const data = await getRequest(SHOP_INFO_PATH)
      this.shopCategoryList = data?.data?.shopCategoryList?.map((item) => {
        const newItem = {
          name: item.shopCategoryName,
          id: item.shopCategoryId
        }
        return newItem
      })
      this.areaList = data?.data?.areaList?.map((item) => {
        const newItem = {
          name: item.areaName,
          id: item.areaId
        }
        return newItem
      })
    },
    //获取店铺信息
    async getShop() {
      const params = {
        shopId: this.shopId
      }
      const data = await getRequest(SHOP_PATH, params)
      const shop = data?.data?.shop || {}
      this.shopName = shop.shopName
      this.shopDesc = shop.shopDesc
      this.shopAddr = shop.shopAddr
      this.phone = shop.phone
      this.shopCategory = {
        name: shop.shopCategory.shopCategoryName,
        id: shop.shopCategory.shopCategoryId
      }
      this.area = {
        name: shop.area.areaName,
        id: shop.area.areaId
      }
    },
    //选择店铺图片
    handleImageChange(event) {
      const file = event.target.files[0]
      this.shop.shopImg = URL.createObjectURL(file)
    },
    //获取token信息
    async fetchToken(url) {
      const token = await store.dispatch('common/fetchToken', { url: url })
      this.token = token
    },
    //获取验证码信息
    async refreshkaptcha() {
      const kaptchaData = await getKaptchaRequest(KAPTCHA_PATH)
      this.kaptchaUrl = kaptchaData.url
      this.kaptchaCode = kaptchaData.kaptchaCode
    },
    //获取类别筛选框的值
    selectedCategoryOptionChange(option) {
      this.shopCategoryId = option.id
    },
    //获取地理位置筛选框的值
    selectedAreaOptionChange(option) {
      this.areaId = option.id
    },
    //点击提交先校验验证码，验证码无误后再提交到后端
    submitShop() {
      //校验验证码
      if (this.kaptchaCode == this.kaptchaInput) {
        //提交店铺修改数据
        const data = {
          shopId: this.shopId,
          shopName: this.shopName,
          shopAddr: this.shopAddr,
          phone: this.phone,
          shopDesc: this.shopDesc,
          shopCategory: {
            shopCategoryId: this.shopCategoryId
          },
          area: {
            areaId: this.areaId
          }
        }
        postRequest(MODITY_SHOP_PATH, data)
      }
    }
  }
})
</script>
<style scoped>
</style>
