<template>
  <div>
    <select v-model="localSelectedOption">
      <option v-for="option in options" :value="option" :key="option.id">{{ option.name }}</option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true
    },
    selectedOption: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      localSelectedOption: this.selectedOption || this.selectedOption?.[0]
    }
  },
  watch: {
    localSelectedOption(newValue, oldValue) {
      console.log(
        'localSelectedOption changed from' +
          JSON.stringify(oldValue) +
          'to' +
          JSON.stringify(newValue)
      )
      this.$emit('update:selectedOption', newValue)
    },
    selectedOption(newValue, oldValue) {
      console.log(
        '====selectedOption===item====' +
          JSON.stringify(oldValue) +
          '======' +
          JSON.stringify(newValue)
      )
      this.localSelectedOption = newValue
    },
    options(newValue, oldVal) {
      console.log(
        '=====options==item==' + JSON.stringify(oldVal) + '======' + JSON.stringify(newValue)
      )
    }
  }
}
</script>
