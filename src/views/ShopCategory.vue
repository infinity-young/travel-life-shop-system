<template>
  <div class="container">
    <div class="title-text">商品类别管理</div>
    <table>
      <thead>
        <tr>
          <th>类别</th>
          <th>优先级</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in categoryList" :key="category.productCategoryId">
          <td>{{ category.productCategoryName }}</td>
          <td>{{ category.priority }}</td>
          <td>
            <button @click="handleClick(category)">删除</button>
          </td>
        </tr>
        <tr v-if="isAddNewCategory">
          <td>
            <input v-model="newCategory.productCategoryName" />
          </td>
          <td>
            <input v-model="newCategory.priority" />
          </td>
          <td>
            <button @click="handleClick(index)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="footer-container">
      <button @click="addCategory">新增</button>
      <button @click="submitCategoryModity">提交</button>
      <BackModel />
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import { CATEGORY_PATH, ADD_CATEGORY_PATH, REMOVE_CATEGORY_PATH } from '../config/requestConfig'
import { getRequest, postRequestJson, postRequest } from '../request/index'
import BackModel from '../components/BackModel.vue'
import { ProductCategoryListResult } from '../../models/ProductCategoryListResult'
//todo 将新增的提交按钮分离出来
export default defineComponent({
    components: {
        BackModel
    },
    data () {
        //存放页面数据
        return {
            categoryList: [],
            shopId: null,
            newCategory: {
                productCategoryName: '',
                priority: ''
            },
            isAddNewCategory: false,
            addCategoryList: []
        }
    },
    mounted () {
        // 页面加载的时候获取页面相关数据
        this.shopId = this.$route.params.shopId
        this.getCategoryData()
    },
    methods: {
        async getCategoryData () {
            const params = { shopId: this.shopId }
            const data = ProductCategoryListResult.from(await getRequest(CATEGORY_PATH, params))
            this.categoryList = data.data
        },
        handleClick (category) {
            if (!category) {
                this.isAddNewCategory = false;
                return;
            }
            //删除相应的数据
            const url = REMOVE_CATEGORY_PATH + '?shopId=' + this.shopId
            //通过formdata的形式传参
            const formData = new FormData()
            formData.append('productCategoryId', category.productCategoryId)
            //头图的传递还需要调试
            postRequest(url, formData)
            location.reload()
        },
        addCategory () {
            // 显示可输入行
            this.isAddNewCategory = true
        },
        //提交类别修改
        submitCategoryModity () {
            // 向 categoryList 数组中添加新的分类信息
            this.addCategoryList.push(this.newCategory)
            // 重置 newCategory 对象
            this.newCategory = {
                productCategoryName: '',
                priority: ''
            }
            //提交添加的数据
            //post请求携带的参数是否需要拼接到URL中 todo
            const url = ADD_CATEGORY_PATH + '?shopId=' + this.shopId
            const data = this.addCategoryList
            postRequestJson(url, data)
            location.reload()
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
</style>
