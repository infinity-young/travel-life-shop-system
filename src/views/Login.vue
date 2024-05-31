<template>
  <div class="login">
    <h1>登录</h1>
    <form>
      <NecessaryInput
        title="用户名"
        :hasInputed="hasUsername"
        v-model:inputValue="username"
        autocomplete="username"
      />
      <NecessaryInput
        title="密码"
        :hasInputed="hasPassword"
        v-model:inputValue="password"
        autocomplete="current-password"
      />
      <NecessaryInput
        title="验证码"
        :icon="kaptchaUrl"
        :hasInputed="hasKaptcha"
        v-model:inputValue="kaptcha"
        @click-image="refreshkaptcha"
      />
      <button type="submit" @click.prevent="login" class="login-button">登录</button>
    </form>
  </div>
</template>

<script>
import { getKaptchaRequest } from '../request/index'
import { LOGIN_PATH, KAPTCHA_PATH } from '../config/requestConfig'
import store from '../stores/index'
import { KaptchaType } from '../../models/KaptchaType';
import NecessaryInput from '../components/NecessaryInput.vue';

export default {
    components: {
        NecessaryInput
    },
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
button {
  padding: 10px;
  border-radius: 5px;
  border: none;
  color: #fff;
  width: 300px;
  font-size: 16px;
  cursor: pointer;
}
</style>

