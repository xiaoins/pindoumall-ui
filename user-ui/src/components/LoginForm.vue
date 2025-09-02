<script setup>
/**
 * 组件参数
 */
defineProps({
  // 表单标题
  title: {
    type: String,
    default: "登录"
  },
  // 表单标签宽度
  labelWidth: {
    type: [Number, String],
    default: 60
  },
  // 按钮文本
  btnText: {
    type: String,
    default: "登录"
  }
})

// 处理第三方登录/注册
const handleThirdPartyAuth = (platform) => {
  console.log('第三方登录:', platform)
  const platformNames = {
    wechat: '微信',
    alipay: '支付宝', 
    apple: '苹果账号',
    google: '谷歌账号'
  }
  showToast(`${platformNames[platform]}登录功能开发中...`)
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
  <div class="login-form box-border w-[95%] max-w-md p-8 m-auto rounded-xl flex flex-col justify-center items-center login-card">
    <!-- Logo 和字体 -->
    <div class="login-logo-section mb-6 flex flex-col items-center">
      <img src="/assets/logo.svg" alt="Logo" class="login-logo w-16 h-16 mb-3" />
      <img src="/assets/pindou-font.svg" alt="品豆" class="login-font h-8" />
    </div>
    

    <div class="login-form__form">
      <n-form
        :label-width="labelWidth"
        label-placement="left"
        label-align="left"
      >
        <slot></slot>
        <n-form-item>
          <n-button type="primary" block round attr-type="submit" @click="$emit('submit')">{{ btnText }}</n-button>
        </n-form-item>
      </n-form>
      
      <!-- 第三方登录/注册选项 -->
      <div class="third-party-auth mt-6">
        <div class="divider-text text-center mb-4">
          <span class="text-gray-500 text-sm px-3">其他{{ title }}方式</span>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <button 
            type="button"
            class="flex items-center justify-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-300"
            @click="handleThirdPartyAuth('wechat')"
          >
            <img src="/assets/icon/微信.svg" alt="微信" class="w-5 h-5 mr-2" />
            <span class="text-sm text-gray-700">微信{{ title }}</span>
          </button>
          <button 
            type="button"
            class="flex items-center justify-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-300"
            @click="handleThirdPartyAuth('alipay')"
          >
            <img src="/assets/icon/支付宝.svg" alt="支付宝" class="w-5 h-5 mr-2" />
            <span class="text-sm text-gray-700">支付宝{{ title }}</span>
          </button>
          <button 
            type="button"
            class="flex items-center justify-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-300"
            @click="handleThirdPartyAuth('apple')"
          >
            <img src="/assets/icon/苹果 (1).svg" alt="苹果" class="w-5 h-5 mr-2" />
            <span class="text-sm text-gray-700">苹果账号{{ title }}</span>
          </button>
          <button 
            type="button"
            class="flex items-center justify-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-300"
            @click="handleThirdPartyAuth('google')"
          >
            <img src="/assets/icon/谷歌支付.svg" alt="谷歌" class="w-5 h-5 mr-2" />
            <span class="text-sm text-gray-700">谷歌账号{{ title }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-card {
  /* 毛玻璃效果 */
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  
  /* 渐变边框效果 */
  position: relative;
  overflow: hidden;
}

.login-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, 
    rgba(168, 230, 207, 0.1) 0%, 
    rgba(127, 205, 205, 0.1) 25%,
    rgba(129, 199, 132, 0.1) 50%,
    rgba(102, 187, 106, 0.1) 75%,
    rgba(76, 175, 80, 0.1) 100%);
  border-radius: inherit;
  z-index: -1;
}

.login-logo {
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
  transition: transform 0.3s ease;
}

.login-logo:hover {
  transform: scale(1.05);
}

.login-font {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.login-form__title {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.divider-text {
  position: relative;
}

.divider-text::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: #e5e7eb;
  z-index: 1;
}

.divider-text span {
  position: relative;
  z-index: 2;
}

.third-party-auth button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>