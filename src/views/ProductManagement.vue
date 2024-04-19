<template>
  <span>product management</span>
  <BackModel title="商品管理" />
  <div class="table-header">
    <div>商品名称</div>
    <div>操作</div>
  </div>
  <InfiniteList
    :data="productList"
    :width="'100%'"
    :height="800"
    :itemSize="200"
    :debug="debug"
    v-slot="{ item }"
    ref="infiniteList"
    @scroll.native="checkScroll"
  >
    <div>{{ item.productName }}</div>
    <div>
      <button @click="editProduct(item.productId)" class="editable-button">编辑</button>
      <button
        @click="offProduct(item.productId)"
        class="editable-button"
        v-if="item.enableStatus == 1"
      >
        下架
      </button>
      <button
        @click="onProduct(item.productId)"
        class="editable-button"
        v-if="item.enableStatus == 0"
      >
        上架
      </button>
      <button @click="previewProduct(item.productId)" class="editable-button">预览</button>
    </div>
  </InfiniteList>
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
import InfiniteList from 'vue3-infinite-list'

export default defineComponent({
    components: {
        BackModel,
        InfiniteList
    },
    data () {
        return {
            count: [],
            shopId: null,
            productList: [],
            buttonStatus: null
        }
    },
    mounted () {
        //页面初始化的时候请求页面数据,从store中获取
        this.shopId = this.$route.params.shopId
        this.$el.addEventListener('scroll', this.checkScroll)
        this.getProductList()
    },
    beforeUnmount () {
        this.$el.removeEventListener('scroll', this.checkScroll)
    },
    methods: {
        fetchToken (url) {
            store.dispatch('common/fetchToken', { url: url })
        },
        //获取list数据
        async getProductList () {
            const url = PRODUCT_LIST_PATH + '?shopId=' + this.shopId
            await store.dispatch('shopList/fetchProductList', { url: url })
            const productList = store.getters['shopList/getProductList']
            this.productList = productList
        },
        //点击编辑
        editProduct (productId) {
            //跳转商品编辑页
            router.push({ name: 'productdetail', params: { productId: productId, shopId: this.shopId } })
        },
        //点击下架
        offProduct (productId) {
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
        onProduct (productId) {
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
        previewProduct (productId) {
            //跳转产品预览页
            router.push({ name: 'productpreview', params: { productId: productId } })
        },
        //点击返回
        goBack () {
            this.$router.back()
        },
        //点击新增商品
        add () {
            router.push({ name: 'productdetail', params: { shopId: this.shopId } })
        },
        //获取更多网络数据
        async loadMore () {
            const url = PRODUCT_LIST_PATH + '?shopId=' + this.shopId
            await store.dispatch('shopList/fetchMoreProductList', { url: url })
            const productList = store.getters['shopList/getProductList']
            this.productList = productList
        },
        checkScroll (event) {
            const { scrollTop, scrollHeight, clientHeight } = event.target

            if (scrollTop + clientHeight >= scrollHeight) {
                console.log('Scrolled to the end of the list')
                // 此处向store中派发action，请求加载更多，然后将重新获取store中的List
                this.loadMore()
            }
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
