<template>
  <div>
    <div @click="goBack" class="back-link">
      <span class="back-text">返回</span>
      <span class="title-text">{{ title }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.back-link {
  display: flex;
  align-items: center;
  color: #333;
  cursor: pointer;
}

.back-link i {
  font-size: 20px;
  margin-right: 5px;
}

.back-text {
  margin-right: 10px;
}

.title-text {
  flex: 1;
  text-align: center;
}
</style>
