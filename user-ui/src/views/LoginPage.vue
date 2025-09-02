<script setup>
import LoginFormByPwd from "@/components/LoginFormByPwd.vue"
import LoginFormByEmail from "@/components/LoginFormByEmail.vue"
import LoginFormToggle from "@/components/LoginFormToggle.vue"
import { ref } from "vue"

// 是否切换为第二个表单
const isToggleForm = ref(false)

// LoginFormToggle 切换表单事件的处理函数
const toggleFormHandler = () => {
  isToggleForm.value = !isToggleForm.value
}
</script>

<template>
  <div class="st-login-page-1-demo-page login-page-bg">
    <st-login-page-1
      v-model="isToggleForm"
      :circle-mask-color="'#18a058'"
      :panel-img-src="[
        '/images/svgs/1.svg',
        '/images/svgs/2.svg'
      ]"
    >
      <template #form-1>
        <LoginFormByEmail />
      </template>
      <template #panel-1-top>
        <LoginFormToggle
          title="已有账号"
          sub-title="如果您的账号已经注册，那么您需要使用用户名与密码进行登录"
          toggle-btn-text="用户名密码登录"
          :toggle-handler="toggleFormHandler"
        />
      </template>
      <template #form-2>
        <LoginFormByPwd />
      </template>
      <template #panel-2-top>
        <LoginFormToggle
          title="使用邮箱注册"
          sub-title="如果您的账号未注册，那么您可以使用邮箱和手机号的方式注册"
          toggle-btn-text="前往邮箱注册"
          :toggle-handler="toggleFormHandler"
        />
      </template>
    </st-login-page-1>
  </div>
</template>

<style scoped>
.login-page-bg {
  background: linear-gradient(135deg, 
    #a8e6cf 0%, 
    #7fcdcd 25%, 
    #81c784 50%, 
    #66bb6a 75%, 
    #4caf50 100%);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
  min-height: 100vh;
}

@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>