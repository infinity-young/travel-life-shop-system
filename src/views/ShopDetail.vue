<template>
  <div class="common-page-container">
    <div class="title-text">商店信息编辑</div>
    <form>
      <div class="columContianer">
        <label for="shopName" class="title">商店名称</label>
        <input type="text" id="shopName" v-model="shopName" class="value" />
      </div>
      <div class="columContianer">
        <label for="shopArea1" class="title">商店分类</label>
        <SelectModel
          :options="shopCategoryList"
          :selectedOption="shopCategory"
          v-on:update:selectedOption="selectedCategoryOptionChange"
          class="value"
        />
      </div>
      <div class="columContianer">
        <label for="shopArea" class="title">所属区域</label>
        <SelectModel
          class="value"
          :options="areaList"
          :selectedOption="area"
          v-on:update:selectedOption="selectedAreaOptionChange"
        />
      </div>
      <div class="columContianer">
        <label for="shopAddr" class="title">详细地址</label>
        <input type="text" id="shopAddr" v-model="shopAddr" class="value" />
      </div>
      <div class="columContianer">
        <label for="phone" class="title">联系电话</label>
        <input type="text" id="phone" v-model="phone" class="value" />
      </div>
      <div class="columContianer">
        <label for="shopImage" class="title">缩略图</label>
        <input type="file" id="shopImage" @change="handleImageChange" class="value" />
      </div>
      <div class="columContianer" v-if="shopImg.length > 0">
        <label class="title">原缩略图</label>
        <img :src="shopImg" class="value" />
      </div>
      <div class="columContianer">
        <label for="shopDesc" class="title">商店简介</label>
        <input type="text" id="shopDesc" v-model="shopDesc" class="value" />
      </div>
      <div class="columContianer">
        <label for="kaptchaUrl" class="title">验证码</label>
        <div class="value">
          <img :src="kaptchaUrl" />
          <input type="text" v-model="kaptchaInput" />
        </div>
      </div>
      <div class="footer-container">
        <button type="submit" @click.prevent="submitShop">提交</button>
        <BackModel />
      </div>
    </form>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import { getRequest, getKaptchaRequest, postRequest } from '../request/index'
import {
    SHOP_INFO_PATH,
    SHOP_PATH,
    KAPTCHA_PATH,
    MODITY_SHOP_PATH,
    ADD_SHOP_PATH,
    IMAGE_PATH
} from '../config/requestConfig'
import SelectModel from '../components/SelectModel.vue'
import BackModel from '../components/BackModel.vue'
import store from '../stores/index'
import { ShopInitInfoResult } from '../../models/ShopInitInfoResult'
import { ShopDetailResult } from '../../models/ShopDetailResult'

export default defineComponent({
    components: {
        SelectModel,
        BackModel
    },
    data () {
        return {
            shopImg: "",
            shop: {},
            areaList: [],
            shopCategoryList: [],
            shopId: null,
            shopName: '',
            shopDesc: '',
            shopAddr: '',
            img: '',
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
    mounted () {
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
        //获取商店基本信息
        async getShopInfo () {
            const data = ShopInitInfoResult.from(await getRequest(SHOP_INFO_PATH))
            this.shopCategoryList = data.shopCategoryList.map((item) => {
                const newItem = {
                    name: item.shopCategoryName,
                    id: item.shopCategoryId
                }
                return newItem
            })
            this.areaList = data.areaList.map((item) => {
                const newItem = {
                    name: item.areaName,
                    id: item.areaId
                }
                return newItem
            })
        },
        //获取商店信息
        async getShop () {
            const params = {
                shopId: this.shopId
            }
            const data = ShopDetailResult.from(await getRequest(SHOP_PATH, params));
            const shop = data.shop
            this.shopName = shop.shopName
            this.shopDesc = shop.shopDesc
            this.shopAddr = shop.shopAddr
            this.phone = shop.phone
            if (shop.shopImg.length > 0) {
                this.shopImg = IMAGE_PATH + shop.shopImg;
            }
            this.shopCategory = {
                name: shop.shopCategory.shopCategoryName,
                id: shop.shopCategory.shopCategoryId
            }
            this.area = {
                name: shop.area.areaName,
                id: shop.area.areaId
            }
        },
        //选择商店图片
        handleImageChange (event) {
            this.img = event.target.files[0]
        },
        //获取token信息
        async fetchToken (url) {
            const token = await store.dispatch('common/fetchToken', { url: url })
            this.token = token
        },
        //获取验证码信息
        async refreshkaptcha () {
            const kaptchaData = await getKaptchaRequest(KAPTCHA_PATH);
            this.kaptchaUrl = kaptchaData.url
            this.kaptchaCode = kaptchaData.kaptchaCode
        },
        //获取类别筛选框的值
        selectedCategoryOptionChange (option) {
            this.shopCategoryId = option.id
        },
        //获取地理位置筛选框的值
        selectedAreaOptionChange (option) {
            this.areaId = option.id
        },
        //todo 两个post接口的图片还有问题
        //点击提交先校验验证码，验证码无误后再提交到后端
        submitShop () {
            //校验验证码通过并有shopId则走商店修改接口
            if ((this.kaptchaCode == this.kaptchaInput) & this.shopId) {
                //提交商店修改数据
                const shopData = {
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
                //此处提交的头图会替换掉已经上传的头图
                const formData = new FormData()
                formData.append('shopStr', JSON.stringify(shopData))
                //头图的传递还需要调试
                formData.append('shopImg', this.img)
                postRequest(MODITY_SHOP_PATH, formData)
            } else if (this.kaptchaCode == this.kaptchaInput) {
                //如果验证码通过无shopId走添加商店接口
                const shopData = {
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
                //此处提交的头图会替换掉已经上传的头图
                const formData = new FormData()
                formData.append('shopStr', JSON.stringify(shopData))
                //头图的传递还需要调试
                formData.append('shopImg', this.img)
                postRequest(ADD_SHOP_PATH, formData)
            }
        }
    }
})
</script>
<style scoped>
.columContianer {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}
.title {
  display: inline-block;
  width: 100px;
}
.value {
  display: flex;
  flex: 1;
}
img {
  margin-right: 10px;
}
</style>
