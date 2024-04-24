import { postRequestJson } from '@/request'
import Cookies from 'js-cookie'
import router from '../router/index'
import { useToast } from 'vue-toastification'



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
        if (response.data.success) {
          commit('setToken', response.data.token)
          Cookies.set('token',response.data.token, { expires: 7 })
          //登录成功重定向到列表页
          router.push({ name: 'shoplist' })
        } else {
          //登录失败则弹框提示错误信息
          const toast = useToast();
          toast.error(response.data.errMsg)
        }
       
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
