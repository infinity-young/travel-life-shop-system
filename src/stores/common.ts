import { postRequestJson } from '@/request'
import Cookies from 'js-cookie'
import router from '../router/index'



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
        const response = await postRequestJson(payload.url)
        commit('setToken', response.data.token)
        Cookies.set('token',response.data.token, { expires: 7 })
        //登录成功重定向到列表页
        router.push({ name: 'shoplist' })
      } catch (error) {
        console.error(error)
      }
    },
    logout({commit}){
      Cookies.remove('token')
      commit('setToken','')
    }
  }
  const getters = {
    getToken: (state) => {
      return state.token|| Cookies.get('token')
    },
  }
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
  }
