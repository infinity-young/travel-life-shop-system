<template>
  <div class="container">
    <span class="title-text">商品管理</span>
    <RecycleScroller
      v-if="productList.length > 0"
      class="listContainer"
      :items="productList"
      :item-size="450"
      :width="'100%'"
      :height="'100%'"
      key-field="productId"
      @scroll="checkScroll"
    >
      <template #default="{ item }">
        <div class="card" :key="item.productId">
          <img :src="item.imgAddr" />
          <div class="descContainer">
            <span class="title">{{ item.productName }}</span>
            <span class="desc">{{ item.productDesc }}</span>
          </div>
          <div class="buttonContainer">
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
        </div>
      </template>
    </RecycleScroller>
    <div v-if="productList.length === 0" class="noContent">暂无数据</div>
    <div class="footer-container">
      <button @click="goBack">返回</button>
      <button @click.prevent="add">新增</button>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import router from '../router/index'
import { PRODUCT_LIST_PATH, PRODUCT_MODIFY_PATH, IMAGE_PATH } from '../config/requestConfig'
import { postRequest } from '../request/index'
import BackModel from '../components/BackModel.vue'
import store from '../stores/index'
import { RecycleScroller } from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
import { useToast } from 'vue-toastification'

export default defineComponent({
    components: {
        BackModel,
        RecycleScroller
    },
    data () {
        return {
            count: [],
            shopId: null,
            noMoreData: false,
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
    computed: {
        // 使用 computed 属性来自动处理 productList 的更新
        productList () {
            return this.$store.state.shopList.productList.map(item => ({
                ...item,
                imgAddr: IMAGE_PATH + item.imgAddr,
            }));
        }
    },

    methods: {
        fetchToken (url) {
            store.dispatch('common/fetchToken', { url: url })
        },
        //获取list数据
        async getProductList () {
            const url = PRODUCT_LIST_PATH + '?shopId=' + this.shopId
            await store.dispatch('shopList/fetchProductList', { url: url })
        },
        //点击编辑
        editProduct (productId) {
            //跳转商品编辑页
            router.push({ name: 'productdetail', params: { productId: productId, shopId: this.shopId } })
        },
        //点击下架
        offProduct (productId) {
            const toast = useToast();
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
            postRequest(url, formData).then((res) => {
                if (res.data?.success) {
                    //下架成功
                    toast.success("下架成功");
                    this.getProductList();
                } else {
                    //下架失败
                    toast.error("下架失败")
                }
            })
        },
        onProduct (productId) {
            const toast = useToast();
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
            postRequest(url, formData).then((res) => {
                if (res.data?.success) {
                    //上架成功
                    toast.success("上架成功");
                    this.getProductList();
                } else {
                    //上架失败
                    toast.error("上架失败")
                }
            })
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
        },
        async checkScroll (event) {
            const { scrollTop, scrollHeight, clientHeight } = event.target

            if (scrollTop + clientHeight >= scrollHeight) {
                this.$emit('scroll', event);
                this.loadMore()
            } else if (!this.noMoreData) {
                const toast = useToast();
                toast.success("已无更多数据");
                this.noMoreData = true;
            }
        }
    }
})
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
}
.listContainer {
  background-color: transparent;
  width: 100%;
  height: 100%;
}
.card {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 400px;
  border-radius: 12px;
  margin-bottom: 12px;
  margin-top: 12px;
  background-color: aliceblue;
}
img {
  height: auto;
  width: 50%;
  border-radius: 12px 0 0 12px;
}
.descContainer {
  display: flex;
  flex-direction: column;
  width: 40%;
  padding-left: 12px;
  padding-bottom: 20px;
  padding-top: 20px;
}
.title {
  font-size: 26px;
  color: #d46587;
}
.desc {
  font-size: 16px;
  color: #d3a8b5;
}
.buttonContainer {
  display: flex;
  width: 10%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  padding-top: 20px;
}
.noContent {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
}
</style>
