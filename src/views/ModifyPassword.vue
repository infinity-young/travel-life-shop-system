<template>
  <div class="login">
    <form>
      <div class="form-group">
        <label for="username">用户名</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="oldpassword">旧密码</label>
        <input type="oldpassword" id="oldpassword" v-model="oldpassword" required />
      </div>
      <div class="form-group">
        <label for="newpassword">新密码</label>
        <input type="newpassword" id="newpassword" v-model="newpassword" required />
      </div>
      <div class="form-group">
        <label for="password">确认密码</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <div class="form-group">
        <label for="kaptcha">验证码</label>
        <div class="kaptcha">
          <img :src="kaptchaUrl" @click="refreshkaptcha" />
        </div>
        <input type="text" id="kaptcha" v-model="kaptcha" required />
      </div>
      <button type="submit" @click.prevent="submit" class="login-button">提交</button>
      <button type="submit" @click.prevent="goBack" class="login-button">返回登录页</button>
    </form>
  </div>
</template>

<script>
import { getKaptchaRequest, postRequest } from '../request/index'
import { MODIFY_PASSWORD_PATH, KAPTCHA_PATH } from '../config/requestConfig'
import store from '../stores/index'
import { useToast } from 'vue-toastification'
import router from '../router/index'

export default {
  data() {
    return {
      username: '',
      password: '',
      newpassword: '',
      oldpassword: '',
      kaptcha: '',
      kaptchaUrl: '',
      kaptchaCode: ''
    }
  },
  mounted() {
    // 页面加载时，获取验证码图片
    this.refreshkaptcha()
  },
  methods: {
    async fetchToken(url) {
      await store.dispatch('common/fetchToken', { url: url })
    },
    async logOut() {
      //登出派发一个action到store，清除cookie中和store中的token
      await store.dispatch('common/logout')
      //重定向到登录页
      router.push({ name: 'login' })
    },
    submit() {
      //如果新密码和确认密码不相等则给用户提示
      if (this.password !== this.newpassword) {
        const toast = useToast()
        toast.error('新密码和确认密码不同')
      } else if (this.kaptcha === this.kaptchaCode && this.password === this.newpassword) {
        //将校验放到前端，验证码校验通过才请求登录接口
        const formData = new FormData()
        formData.append('userName', this.username)
        formData.append('password', this.passwordold)
        formData.append('newPassword', this.password)
        //请求修改密码接口
        postRequest(MODIFY_PASSWORD_PATH, formData)
        //密码修改成功以后返回登录页
        //先登出清空cookie和store中的token，再重定向到登录页
        //todo 需要先确定修改密码接口返回值是什么，再根据回调的值确定走啥
        // this.logOut()
      }
    },
    async refreshkaptcha() {
      const kaptchaData = await getKaptchaRequest(KAPTCHA_PATH)
      this.kaptchaUrl = kaptchaData.url
      this.kaptchaCode = kaptchaData.kaptchaCode
    },
    goBack() {
      //返回登录页
    }
  }
}
</script>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 300px;
  font-size: 16px;
}

button {
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: #007aff;
  color: #fff;
  width: 300px;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #0062cc;
}
.kaptcha {
  display: inline-block;
  margin-bottom: 10px;
}

.kaptcha img {
  cursor: pointer;
}

.login-button {
  margin-bottom: 200px;
}
</style>
