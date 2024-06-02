<template>
  <div class="common-page-container">
    <span class="title-text">商品详情</span>
    <div>
      <form>
        <div>
          <label for="productName">商品名称</label>
          <input type="text" id="productName" v-model="productName" />
        </div>
        <div>
          <label for="shopArea1">目录：</label>
          <SelectModel
            :options="productCategoryList"
            :selectedOption="productCategory"
            v-on:update:selectedOption="selectedCategoryOptionChange"
          />
        </div>
        <div>
          <label for="priority">优先级：</label>
          <input type="text" id="priority" v-model="priority" />
        </div>
        <div>
          <label for="normalPrice">原价：</label>
          <input type="text" id="normalPrice" v-model="normalPrice" />
        </div>
        <div>
          <label for="promotionPrice">现价</label>
          <input type="text" id="promotionPrice" v-model="promotionPrice" />
        </div>
        <div>
          <label for="shopImage">缩略图</label>
          <input type="file" id="shopImage" @change="handleHeadImageChange" />
          <!-- <img :src="shop.shopImg" v-if="shop.shopImg" /> 是否需要添加展示模块-->
        </div>
        <div>
          <label for="shopImage">详情图</label>
          <input type="file" id="shopImage" @change="handleDetailImageChange" />
          <!-- <img :src="shop.shopImg" v-if="shop.shopImg" /> 是否需要添加展示模块-->
        </div>
        <div>
          <label for="productDesc">商品描述</label>
          <input type="text" id="productDesc" v-model="productDesc" />
        </div>
        <div>
          <label for="kaptchaUrl">验证码</label>
          <img :src="kaptchaUrl" />
          <input type="text" id="kaptchaInput" v-model="kaptchaInput" />
        </div>
        <div class="footer-container">
          <button type="submit" @click.prevent="goBack">返回商品管理</button>
          <button type="submit" @click.prevent="submitProductModify">提交</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import {
    PRODUCT_PATH,
    PRODUCT_MODIFY_PATH,
    KAPTCHA_PATH,
    CATEGORY_PATH,
    PRODUCT_ADD_PATH
} from '../config/requestConfig'
import { getRequest, getKaptchaRequest, postRequest } from '../request/index'
import SelectModel from '../components/SelectModel.vue'
import store from '../stores/index'
import { ProductDetailResult } from '../../models/ProductDetailResult'

export default defineComponent({
    components: {
        SelectModel
    },
    data () {
        return {
            product: {},
            productCategoryList: [],
            productName: '',
            productCategory: {
                name: '',
                id: ''
            },
            priority: '',
            normalPrice: '',
            promotionPrice: '',
            productImageList: [],
            imgAddr: '',
            productDesc: '',
            kaptchaUrl: '',
            kaptchaInput: '',
            kaptchaCode: '',
            shopId: '',
            productId: ''
        }
    },
    mounted () {
        //加载的时候请求页面数据
        this.shopId = this.$route.params.shopId
        this.productId = this.$route.params.productId
        this.getProductCategory()
        this.getProductInfo()
        this.refreshkaptcha()
    },
    methods: {
        //获取页面信息
        async getProductInfo () {
            if (!this.productId) {
                return
            }
            const params = {
                shopId: this.shopId,
                productId: this.productId
            }
            const data = ProductDetailResult.from(await getRequest(PRODUCT_PATH, params))
            const product = data.product || {}
            this.product = product
            this.productName = product.productName
            this.priority = product.priority
            this.normalPrice = product.normalPrice
            this.promotionPrice = product.promotionPrice
            this.imgAdd = product.imgAdd
            this.productDesc = product.productDesc
            const selectedCategory =
                this.getSelectedProductCategory(
                    product.productCategory?.productCategoryId,
                    this.productCategoryList
                ) || {}
            this.productCategory = {
                name: selectedCategory.name,
                id: selectedCategory.id
            }
        },
        getSelectedProductCategory (id, productCategoryList) {
            return productCategoryList?.find((category) => category.id === id)
        },
        //获取类别信息
        async getProductCategory () {
            const params = { shopId: this.shopId }
            const data = await getRequest(CATEGORY_PATH, params)
            this.productCategoryList = data?.data?.data?.map((item) => {
                const newItem = {
                    name: item.productCategoryName,
                    id: item.productCategoryId
                }
                return newItem
            })
        },
        //
        selectedCategoryOptionChange (selectedCategory) {
            this.productCategoryId = selectedCategory.id
        },
        //获取token信息
        async fetchToken (url) {
            const token = await store.dispatch('common/fetchToken', { url: url })
            this.token = token
        },
        //获取验证码信息
        async refreshkaptcha () {
            const kaptchaData = await getKaptchaRequest(KAPTCHA_PATH)
            this.kaptchaUrl = kaptchaData.url
            this.kaptchaCode = kaptchaData.kaptchaCode
        },
        //添加头图信息
        handleHeadImageChange (event) {
            this.imgAddr = event.target.files[0]
        },
        //添加详情图，商品详情为必填项
        handleDetailImageChange (event) {
            this.productImageList.push(event.target.files[0])
        },
        //提交修改信息
        submitProductModify () {
            if (this.kaptchaCode === this.kaptchaInput && this.productId) {
                const data = {
                    productName: this.productName,
                    productDesc: this.productDesc,
                    priority: this.priority,
                    normalPrice: this.normalPrice,
                    promotionPrice: this.promotionPrice,
                    productCategory: {
                        productCategoryId: this.productCategoryId
                    },
                    productId: this.productId
                }
                //以formdata的形式提交数据
                const formData = new FormData()
                formData.append('productStr', JSON.stringify(data))
                //添加图片信息
                formData.append('thumbnail', this.imgAddr)
                for (let i = 0; i < this.productImageList.length; i++) {
                    const key = 'productImg' + JSON.stringify(i)
                    formData.append(key, this.productImageList[i])
                }
                const url = PRODUCT_MODIFY_PATH + '?shopId=' + this.shopId
                postRequest(url, formData)
            } else if (this.kaptchaCode === this.kaptchaInput) {
                //如果有productid则为修改，否则为新增商品PRODUCT_ADD_PATH
                const data = {
                    productName: this.productName,
                    productDesc: this.productDesc,
                    priority: this.priority,
                    normalPrice: this.normalPrice,
                    promotionPrice: this.promotionPrice,
                    productCategory: {
                        productCategoryId: this.productCategoryId
                    }
                }
                //以formdata的形式提交数据
                const formData = new FormData()
                formData.append('productStr', JSON.stringify(data))
                //添加图片信息
                formData.append('thumbnail', this.imgAddr)
                for (let i = 0; i < this.productImageList.length; i++) {
                    const key = 'productImg' + JSON.stringify(i)
                    formData.append(key, this.productImageList[i])
                }
                const url = PRODUCT_ADD_PATH + '?shopId=' + this.shopId
                postRequest(url, formData)
            }
        },
        //返回上一个页面
        goBack () {
            //如果不使用@click.prevent而使用@click绑定goBack函数则无法正常返回上一级页面
            this.$router.back()
        }
    }
})
</script>

<style scoped>
</style>