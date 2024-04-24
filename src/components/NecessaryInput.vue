<template>
  <div class="container">
    <div class="title-container">
      <label>{{ title }}</label>
      <label class="title-icon">*</label>
    </div>
    <div class="input-container">
      <img v-if="icon?.length > 0" class="input-icon" :src="icon" @click="handleClick" />
      <div class="input-content-container">
        <input
          v-model="inputValue"
          :class="{ 'input-error': !hasInputed }"
          :autocomplete="autocomplete"
          @blur="onBlur"
          required
        />
        <span v-if="!hasInputed" class="error-message">此项为必填项</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    props: {
        title: String,
        icon: String,
        hasInputed: Boolean,
        autocomplete: String,
    },
    data () {
        console.log("=======", this.originInputValue)
        return {
            inputValue: this.originInputValue || ""
        }
    },
    methods: {
        handleClick () {
            this.$emit("click-image")
        },
        onBlur () {
            this.$emit('update:inputValue', this.inputValue);
        }
    }
}
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 300px;
}
.title-container {
  display: flex;
  flex-direction: row;
}
label {
  display: block;
  margin-bottom: 5px;
}
.title-icon {
  color: red;
}
.input-container {
  display: flex;
  flex-grow: 1;
  flex-direction: row;
}
.input-icon {
  cursor: pointer;
  width: 100px;
  margin-right: 10px;
}
.input-content-container {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
}
input {
  display: flex;
  flex: 1;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
}
.input-error {
  border-color: red;
}

.error-message {
  color: red;
}
</style>
