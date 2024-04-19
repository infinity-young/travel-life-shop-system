<template>
  <span>Product Preview</span>
  <BackModel :title="product.productName" />
  <div>
    <div class="header-image">
      <img :src="headImage" alt="Header Image" />
    </div>
    <div>
      <div class="price">
        <span class="discount-price">¥{{ product.promotionPrice }}</span>
        <del class="original-price">¥{{ product.normalPrice }}</del>
      </div>
      <span>{{ product.productDesc }}</span>
    </div>
  </div>
  <div>
    <span>酒店详情图片</span>
    <div class="detail-images">
      <img class="detail-image" v-for="image in detailImage" :src="image" :key="image" />
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import { PRODUCT_DETAIL_INFO_PATH, IMAGE_PATH } from '../config/requestConfig'
import { getRequest } from '../request/index'
import BackModel from '../components/BackModel.vue'
import { ProductDetailResult } from '../../models/ProductDetailResult'

export default defineComponent({
    components: {
        BackModel
    },
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
            this.headImage = IMAGE_PATH + data?.data?.product?.imgAddr
            this.detailImage = data?.data?.product?.productImgList?.map((item) => {
                return IMAGE_PATH + item.imgAddr
            })
        }
    }
})
</script>
<style scoped>
.header-image {
  width: 100vw;
  height: 33vh;
  overflow: hidden;
}

.header-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.price {
  display: flex;
  align-items: baseline;
}

.discount-price {
  font-size: 24px;
  font-weight: bold;
  color: red;
}

.original-price {
  margin-left: 10px;
  font-size: 16px;
  color: #999;
  text-decoration: line-through;
}
.detail-image {
  width: 100vw;
  height: 33vh;
  overflow: hidden;
}

.detail-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
