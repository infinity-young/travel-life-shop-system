<template>
  <div class="login">
    <h1>登录</h1>
    <form>
      <div class="form-group">
        <div class="necessary-group">
          <label for="username">用户名</label>
          <label class="necessary-icon">*</label>
        </div>
        <input
          type="text"
          id="username"
          v-model="username"
          :class="{ 'input-error': !hasUsername }"
          required
        />
        <span v-if="!hasUsername" class="error-message">此项为必填项</span>
      </div>
      <div class="form-group">
        <div class="necessary-group">
          <label for="password">密码</label>
          <label class="necessary-icon">*</label>
        </div>
        <input
          type="password"
          id="password"
          v-model="password"
          :class="{ 'input-error': !hasPassword }"
          required
        />
        <span v-if="!hasPassword" class="error-message">此项为必填项</span>
      </div>
      <div class="form-group-kaptcha">
        <div class="necessary-group">
          <label for="kaptcha">验证码</label>
          <label class="necessary-icon">*</label>
        </div>
        <div class="kaptcha">
          <img :src="kaptchaUrl" @click="refreshkaptcha" />
          <div class="kaptcha-container">
            <input
              class="kaptcha-input"
              type="text"
              v-model="kaptcha"
              :class="{ 'input-error': !hasKaptcha }"
              required
            />
            <span v-if="!hasKaptcha" class="error-message">此项为必填项</span>
          </div>
        </div>
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
            hasUsername: true,
            hasPassword: true,
            hasKaptcha: true,
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
            //校验输入是否已经完整
            this.hasUsername = this.username.length > 0;
            this.hasPassword = this.password.length > 0;
            this.hasKaptcha = this.kaptcha.length > 0;
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
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.form-group-kaptcha {
  width: 300px;
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

.necessary-group {
  display: flex;
  flex-direction: row;
}

.necessary-icon {
  color: red;
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
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
}

.kaptcha-input {
  width: 190px;
}

.kaptcha img {
  cursor: pointer;
  width: 100px;
}
.kaptcha-container {
  margin-left: 10px;
}

.input-error {
  border-color: red;
}

.error-message {
  color: red;
}
</style>

