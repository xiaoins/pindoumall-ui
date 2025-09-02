<script setup>
import LoginForm from "./LoginForm.vue"
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

// 表单数据
const formData = ref({
  username: '',
  password: ''
})

// 表单引用
const formRef = ref(null)

// 处理登录
const handleLogin = async () => {
  if (!formData.value.username || !formData.value.password) {
    showToast('请输入用户名和密码', 'warning')
    return
  }

  const loginData = {
    username: formData.value.username,
    password: formData.value.password,
    loginType: 'username'
  }

  const result = await userStore.login(loginData)
  
  if (result.success) {
    showToast('登录成功！', 'success')
    // 登录成功后跳转到首页
    router.push('/')
  } else {
    showToast(result.message || '登录失败', 'error')
  }
}

// 显示提示消息
const showToast = (message, type = 'info') => {
  const toast = document.createElement('div')
  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500'
  }[type] || 'bg-blue-500'
  
  toast.className = `fixed top-20 right-4 ${bgColor} text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-all duration-300`
  toast.textContent = message
  document.body.appendChild(toast)
  
  setTimeout(() => {
    toast.style.opacity = '0'
    setTimeout(() => {
      if (document.body.contains(toast)) {
        document.body.removeChild(toast)
      }
    }, 300)
  }, 3000)
}
</script>

<template>
  <div class="login-form-by-pwd">
    <form @submit.prevent="handleLogin">
      <LoginForm title="登录" btn-text="登录" @submit="handleLogin">
        <n-form-item label="用户名">
          <n-input 
            v-model:value="formData.username"
            placeholder="请输入用户名" 
            clearable
          />
        </n-form-item>
        <n-form-item label="密码">
          <n-input 
            v-model:value="formData.password"
            placeholder="请输入密码" 
            type="password" 
            clearable 
            show-password-on="click"
            @keyup.enter="handleLogin"
          />
        </n-form-item>
      </LoginForm>
    </form>
  </div>
</template>

<style scoped>

</style>