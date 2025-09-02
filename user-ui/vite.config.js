import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 按需自动加载组件的 Vite 插件
import Components from 'unplugin-vue-components/vite'
// 按需自动加载 st-common-ui-vue3 组件的解析器，用于帮助按需自动加载组件的 Vite 插件自动按需加载 st-common-ui-vue3 组件
import { StCommonUIVue3Resolver } from "st-common-ui-vue3"
// Node.js 内置的 path 模块
import * as path from 'path'
// 自动引入 API 的插件
import AutoImport from 'unplugin-auto-import/vite'
// 按需自动加载 Naive UI 组件的解析器，用于帮助按需自动加载组件的插件自动按需加载 Navie UI 组件
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

// 项目中 src 目录的绝对路径
// __dirname 表示当前文件所在目录的绝对路径
const srcAbsolutePath = path.resolve(__dirname, './src')

export default defineConfig({
  plugins: [
    vue(),
    // 自动引入 API 的插件
    AutoImport({
      // 自动引入 Vue 和 Navie UI 中的 API
      imports: [
        'vue',
        {
          'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'],
        },
      ],
      // 不要自动引入的 API
      ignore: ['h']
    }),
    // 配置按需自动加载组件的 Vite 插件
    Components({
      // 配置解析器，用于帮助按需自动加载组件的 Vite 插件解析并按需加载组件
      resolvers: [
        StCommonUIVue3Resolver(),
        NaiveUiResolver(),
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': srcAbsolutePath,
    },
  },
  server: {
    port: 3000,
    open: true
  }
})