<template>
  <button class="back" @click="goBack"></button>
  <div class="common-page-container">
    <div class="title-text">{{ product.productName }}</div>
    <div class="card">
      <div class="headerImage">
        <img :src="headImage" alt="Header Image" />
      </div>
      <div class="headContentContainer">
        <div class="itemContainer">
          <div class="title">原价</div>
          <del class="originalPrice">¥{{ product.normalPrice }}</del>
        </div>
        <div class="itemContainer">
          <div class="title">促销价</div>
          <span class="discountPrice">¥{{ product.promotionPrice }}</span>
        </div>
        <div class="itemContainer">
          <div class="title">商品详情</div>
          <span>{{ product.productDesc }}</span>
        </div>
      </div>
    </div>
    <div class="card">
      <span class="detailTitle">商品详情图片</span>
      <div class="detailImages">
        <img class="detail-image" v-for="image in detailImage" :src="image" :key="image" />
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import { PRODUCT_DETAIL_INFO_PATH, IMAGE_PATH } from '../config/requestConfig'
import { getRequest } from '../request/index'
import { ProductDetailResult } from '../../models/ProductDetailResult'

export default defineComponent({
    data () {
        return {
            product: {},
            productId: null,
            headImage: '',
            detailImage: []
        }
    },
    mounted () {
        //获取路由数据
        this.productId = this.$route.params.productId
        //请求页面数据
        this.getProductDetailInfo()
    },
    methods: {
        async getProductDetailInfo () {
            const params = {
                productId: this.productId
            }
            const data = ProductDetailResult.from(await getRequest(PRODUCT_DETAIL_INFO_PATH, params))
            this.product = data.product
            this.headImage = IMAGE_PATH + data.product.imgAddr
            this.detailImage = data.product.productImgList.map((item) => {
                return IMAGE_PATH + item.imgAddr
            })
        },
        goBack () {
            this.$router.go(-1)
        }
    }
})
</script>
<style scoped>
.back {
  background-image: url('../assets/back_gray_icon.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border: none;
  cursor: pointer;
  width: 100px;
  height: 50px;
  background-color: transparent;
}
.back:active {
  background-color: transparent;
  box-shadow: revert;
  transform: revert;
}
.card {
  width: 100%;
  border-radius: 12px;
  margin-bottom: 12px;
  background-color: aliceblue;
}
.headerImage {
  width: 100%;
  height: auto;
  border-radius: 12px 12px 0 0;
}

.headerImage img {
  width: 100%;
  height: 100%;
  border-radius: 12px 12px 0 0;
}
.headContentContainer {
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 10px;
  margin-right: 10px;
  margin-left: 10px;
}

.itemContainer {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.title {
  width: 100px;
  font-size: 20px;
}

.discountPrice {
  font-size: 24px;
  font-weight: bold;
  color: red;
}

.originalPrice {
  font-size: 16px;
  color: #999;
  text-decoration: line-through;
}

.detailTitle {
  display: flex;
  justify-content: center;
  border-radius: 12px 12px 0 0;
  padding-top: 20px;
  font-size: 20px;
}
.detailImages {
  width: 100%;
  height: auto;
  overflow: hidden;
  padding-left: 12px;
  padding-right: 12px;
}

.detailImages img {
  width: 100%;
  height: auto;
  border-radius: 12px;
  object-fit: fill;
  margin-top: 12px;
  margin-bottom: 12px;
}
</style>
