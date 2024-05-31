<template>
  <div class="login">
    <form>
      <NecessaryInput
        title="用户名"
        :hasInputed="hasUsername"
        v-model:inputValue="username"
        autocomplete="username"
      />
      <NecessaryInput
        title="旧密码"
        :hasInputed="hasOldPassword"
        v-model:inputValue="oldpassword"
        autocomplete="oldpassword"
      />
      <NecessaryInput
        title="新密码"
        :hasInputed="hasNewPassword"
        v-model:inputValue="newpassword"
        autocomplete="newpassword"
      />
      <NecessaryInput
        title="确认密码"
        :hasInputed="hasPassword"
        v-model:inputValue="password"
        autocomplete="password"
      />
      <NecessaryInput
        title="验证码"
        :hasInputed="hasKaptcha"
        :icon="kaptchaUrl"
        v-model:inputValue="kaptcha"
        @click-image="refreshkaptcha"
      />

      <button type="submit" @click.prevent="submit" class="login-button">提交</button>
      <button type="submit" @click.prevent="goBack" class="login-button">返回</button>
    </form>
  </div>
</template>

<script>
import { getKaptchaRequest, postRequest } from '../request/index'
import { MODIFY_PASSWORD_PATH, KAPTCHA_PATH } from '../config/requestConfig'
import store from '../stores/index'
import { useToast } from 'vue-toastification'
import router from '../router/index'
import { KaptchaType } from '../../models/KaptchaType';
import NecessaryInput from '../components/NecessaryInput.vue';


export default {
    components: {
        NecessaryInput
    },
    data () {
        return {
            username: '',
            hasUsername: true,
            password: '',
            hasPassword: true,
            newpassword: '',
            hasNewPassword: true,
            oldpassword: '',
            hasOldPassword: true,
            kaptcha: '',
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
        async logOut () {
            //登出派发一个action到store，清除cookie中和store中的token
            await store.dispatch('common/logout')
            //重定向到登录页
            router.push({ name: 'login' })
        },
        async submit () {
            const toast = useToast()
            //如果新密码和确认密码不相等则给用户提示
            if (this.password !== this.newpassword) {
                toast.error('新密码和确认密码不同')
            } else if (this.kaptcha === this.kaptchaCode && this.password === this.newpassword) {
                //将校验放到前端，验证码校验通过才请求登录接口
                const formData = new FormData()
                formData.append('userName', this.username)
                formData.append('password', this.oldpassword)
                formData.append('newPassword', this.password)
                //请求修改密码接口
                const data = await postRequest(MODIFY_PASSWORD_PATH, formData)
                //密码修改成功以后返回登录页
                if (data?.data?.success) {
                    this.logOut()
                } else {
                    //如果不成功提示原因
                    toast.error(data?.data?.errMsg)
                }
            }
        },
        async refreshkaptcha () {
            const kaptchaData = KaptchaType.from(await getKaptchaRequest(KAPTCHA_PATH))
            this.kaptchaUrl = kaptchaData.url
            this.kaptchaCode = kaptchaData.kaptchaCode
        },
        goBack () {
            //返回
            this.$router.go(-1)
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
.login-button {
  margin-top: 20px;
}
</style>
