<template>
  <span>shop list view </span>
</template>
<script>
import { getRequest } from '../request/index'
import { SHOP_LIST_PATH } from '../config/requestConfig'

export default {
  data() {
    return {
      shopList: [],
      user: {}
    }
  },
  async setup() {
    const data = await getRequest(SHOP_LIST_PATH)
    console.log('======' + JSON.stringify(data))
  }
}
</script>
