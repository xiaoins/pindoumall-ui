<script setup>
import LoginForm from "./LoginForm.vue"
import { ref } from 'vue'

// 验证码倒计时
const countdown = ref(0)
const isCountingDown = ref(false)

// 发送验证码
const sendVerificationCode = () => {
  if (isCountingDown.value) return
  
  // 开始倒计时
  countdown.value = 60
  isCountingDown.value = true
  
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
      isCountingDown.value = false
    }
  }, 1000)
  
  // 这里可以添加实际的发送验证码逻辑
  console.log('发送验证码')
  showToast('验证码已发送')
}

// 显示提示消息
const showToast = (message) => {
  const toast = document.createElement('div')
  toast.className = 'fixed top-20 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-all duration-300'
  toast.textContent = message
  document.body.appendChild(toast)
  
  setTimeout(() => {
    toast.style.opacity = '0'
    setTimeout(() => {
      document.body.removeChild(toast)
    }, 300)
  }, 2000)
}
</script>

<template>
  <div class="login-form-by-email">
    <LoginForm title="邮箱注册" btn-text="注册">
      <n-form-item label="邮箱">
        <n-input placeholder="请输入邮箱" clearable/>
      </n-form-item>
      <n-form-item label="手机号">
        <n-input placeholder="请输入手机号" clearable/>
      </n-form-item>
      <n-form-item label="用户名">
        <n-input placeholder="请输入用户名" clearable/>
      </n-form-item>
      <n-form-item label="密码">
        <n-input type="password" placeholder="请输入密码" clearable/>
      </n-form-item>
      <n-form-item label="验证码">
        <n-input-group>
          <n-input placeholder="请输入验证码" clearable style="flex: 1;"/>
          <n-button 
            type="primary" 
            :disabled="isCountingDown"
            @click="sendVerificationCode"
            style="margin-left: 8px; white-space: nowrap;"
          >
            {{ isCountingDown ? `${countdown}s后重发` : '发送验证码' }}
          </n-button>
        </n-input-group>
      </n-form-item>
    </LoginForm>
  </div>
</template>

<style scoped>

</style>