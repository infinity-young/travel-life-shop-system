<template>
  <div>
    <h2>商品分类列表</h2>
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
    <div>
      <button @click="addCategory">新增</button>
      <button @click.prevent="submitCategoryModity">提交</button>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import { CATEGORY_PATH, ADD_CATEGORY_PATH, REMOVE_CATEGORY_PATH } from '../config/requestConfig'
import { getRequest, postRequest } from '../request/index'
//todo 将新增的提交按钮分离出来
export default defineComponent({
  data() {
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
  mounted() {
    // 页面加载的时候获取页面相关数据
    this.shopId = this.$route.params.shopId
    this.getCategoryData()
  },
  methods: {
    async getCategoryData() {
      const params = { shopId: this.shopId }
      const data = await getRequest(CATEGORY_PATH, params)
      this.categoryList = data?.data
    },
    handleClick(category) {
      //删除相应的数据
      const data = {
        productCategoryId: category.productCategoryId
      }
      const url = REMOVE_CATEGORY_PATH + '?shopId=' + JSON.stringify(this.shopId)
      postRequest(url, data)
      //提交成功后刷新数据 todo
    },
    addCategory() {
      // 显示可输入行
      this.isAddNewCategory = true
    },
    //提交类别修改
    submitCategoryModity() {
      // 向 categoryList 数组中添加新的分类信息
      this.addCategoryList.push(this.newCategory)
      // 重置 newCategory 对象
      this.newCategory = {
        productCategoryName: '',
        priority: ''
      }
      //提交添加的数据
      //post请求携带的参数是否需要拼接到URL中 todo
      const url = ADD_CATEGORY_PATH + '?shopId=' + JSON.stringify(this.shopId)
      const data = this.addCategoryList
      postRequest(url, data)
    }
  }
})
</script>
<style scoped>
</style>
