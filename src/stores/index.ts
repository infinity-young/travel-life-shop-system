import { createStore } from 'vuex'
import common from'./common'
import shopList from './shopList'

const store = createStore({
  modules: {
    common,
    shopList
  },
})

export default store
