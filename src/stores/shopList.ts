import { getRequest } from '@/request'

 const state={
    productList:[],
    pageIndex:1,
    pageSize:2
  }
 const mutations= {
    setProductList(state, productList) {
      state.productList = productList
    },
  }
  const actions={
     async fetchProductList({ commit},payload) {
    try {
        const params={
            pageIndex:state.pageIndex,
            pageSize:state.pageSize
        }
      const response = await getRequest(payload.url,params)
      commit('setProductList', response.data.productList)
    } catch (error) {
      console.error(error)
    }
  },
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
