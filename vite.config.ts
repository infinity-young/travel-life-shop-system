import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// import path from 'path';
// import modulePaths from'./scripts/modulePaths'
// import { s } from 'vitest/dist/types-63abf2e0.js';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // ...modulePaths.reduce((alias, modulePath) => {
      //   const moduleName = modulePath.split('/').pop(); // 获取文件名
      //   if (moduleName) {
      //     // 设置别名，例如：{"__BestPromoDetail": "模块的真实路径"}
      //     console.log("========"+JSON.stringify(moduleName)+"======="+JSON.stringify(path.resolve(__dirname, modulePath)))
      //     alias[moduleName.replace('.ts', '')] = path.resolve(__dirname, modulePath);
      //   }
      //   return alias;
      // }, {})
    }
  }
})
