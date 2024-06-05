import { getRequest } from '@/request'
import { ProductListResult } from '../../models/ProductListResult'

 const state={
    productList:[],
    pageIndex:1,
    pageSize:2,
    count:0
 }
 const mutations= {
    setProductList(state, productList) {
      state.productList = productList
    },
    setCount(state,count){
      state.count=count
    },
    setPageIndex(state,pageIndex){
      state.pageIndex=pageIndex
   },
   updateProductList(state, newProducts) {
    // 使用 concat 合并数组，并将结果赋值回 state.productList
    state.productList = state.productList.concat(newProducts);
  }
  }
  const actions={
     async fetchProductList({ commit},payload) {
    try {
        const params={
            pageIndex:1,
            pageSize:state.pageSize
      }  
      const response:ProductListResult.t = await getRequest(payload.url, params);
      const data = ProductListResult.from(response)
      commit('setPageIndex',1)
      commit('setProductList', data.productList)
      commit('setCount',data.count)
    } catch (error) {
      console.error(error)
    }
  },
    async fetchMoreProductList({ commit }, payload) {
      if(state.count>state.productList.length){
        commit('setPageIndex',state.pageIndex+1)
        try {
          const params={
              pageIndex:state.pageIndex,
              pageSize:state.pageSize
          }
          const response = await getRequest(payload.url, params)
          const data = ProductListResult.from(response)
          commit('updateProductList', data.productList);
      } catch (error) {
        console.error(error)
        }
      }
     }
  }
  const getters = {
    getProductList: (state) => {
      return state.productList
    },
  }
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
  }
