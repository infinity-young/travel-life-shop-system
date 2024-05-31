<template>
  <div>
    <div @click="goBack" class="back-link">
      <button>返回</button>
    </div>
  </div>
</template>

<script>
export default {
    methods: {
        goBack () {
            this.$router.go(-1)
        }
    }
}
</script>

<style scoped>
</style>
