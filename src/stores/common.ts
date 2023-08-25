import { postRequest } from '@/request'

 const state={
    token:'',
  }
 const mutations= {
    setToken(state, token) {
      state.token = token
    },
  }
  const actions={
     async fetchToken({ commit},payload) {
    try {
      const response = await postRequest(payload.url)
      commit('setToken', response.data.token)
    } catch (error) {
      console.error(error)
    }
  },
  }
  const getters = {
    getToken: (state) => {
      return state.token
    },
  }
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
  }
