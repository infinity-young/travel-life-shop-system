import { getRequest } from '@/request'

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
    }
  }
  const actions={
     async fetchProductList({ commit},payload) {
    try {
        const params={
            pageIndex:state.pageIndex,
            pageSize:state.pageSize
        }
      const response = await getRequest(payload.url,params)
      commit('setProductList', response?.data?.productList)
      commit('setCount',response?.data?.count)
    } catch (error) {
      console.error(error)
    }
  },
     async fetchMoreProductList({ commit},payload){
      if(state.count<state.productList.length){
        commit('setPageIndex',state.pageIndex+1)
        try {
          const params={
              pageIndex:state.pageIndex,
              pageSize:state.pageSize
          }
        const response = await getRequest(payload.url,params)
        const currentProductList=state.productList.concat(response?.data?.productList)
        commit('setProductList', currentProductList)
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
