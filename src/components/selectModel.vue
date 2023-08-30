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
    localSelectedOption(newValue) {
      this.$emit('update:selectedOption', newValue)
    },
    selectedOption(newValue) {
      this.localSelectedOption = newValue
    }
  }
}
</script>
