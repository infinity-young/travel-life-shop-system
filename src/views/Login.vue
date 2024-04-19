<template>
  <div class="login">
    <h1>登录</h1>
    <form>
      <div class="form-group">
        <label for="username">用户名</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="password">密码</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <div class="form-group">
        <label for="kaptcha">验证码</label>
        <div class="kaptcha">
          <img :src="kaptchaUrl" @click="refreshkaptcha" />
        </div>
        <input type="text" id="kaptcha" v-model="kaptcha" required />
      </div>
      <button type="submit" @click.prevent="login" class="login-button">登录</button>
    </form>
  </div>
</template>

<script>
import { getKaptchaRequest } from '../request/index'
import { LOGIN_PATH, KAPTCHA_PATH } from '../config/requestConfig'
import store from '../stores/index'
import { KaptchaType } from '../../models/KaptchaType';

export default {
    data () {
        return {
            username: '',
            password: '',
            kaptcha: '',
            kaptchaUrl: '',
            kaptchaCode: ''
        }
    },
    mounted () {
        // 页面加载时，获取验证码图片
        this.refreshkaptcha()
    },
    methods: {
        async fetchToken (url) {
            await store.dispatch('common/fetchToken', { url: url })
        },
        login () {
            // 进行登录操作
            const url =
                LOGIN_PATH +
                '?' +
                'userName=' +
                this.username +
                '&password=' +
                this.password +
                '&needVerify=' +
                true +
                '&kaptchaInput=' +
                this.kaptcha
            //将校验放到前端，验证码校验通过才请求登录接口
            if (this.kaptcha === this.kaptchaCode) {
                this.fetchToken(url)
            }
        },
        async refreshkaptcha () {
            const kaptchaData = KaptchaType.from(await getKaptchaRequest(KAPTCHA_PATH))
            this.kaptchaUrl = kaptchaData.url
            this.kaptchaCode = kaptchaData.kaptchaCode
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

