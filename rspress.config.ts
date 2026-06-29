import path from 'node:path';
import { pluginLess } from '@rsbuild/plugin-less';
import { defineConfig } from '@rspress/core';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  outDir: 'docs-dist',
  title: 'wwj-element',
  lang: 'zh',
  themeConfig: {
    lastUpdated: true,
  },
  builderConfig: {
    server: {
      port: 8000,
    },
    resolve: {
      alias: {
        // 开发时直接读源码，跳过构建步骤，支持 HMR 热更新
        '@wwj/utils': path.join(__dirname, 'packages/utils/src/index.ts'),
        '@wwj/components': path.join(__dirname, 'packages/components/src/index.ts'),
      },
    },
    source: {
      // antd 按需引入样式
      transformImport: [{ libraryName: 'antd', libraryDirectory: 'es', style: true }],
    },
    plugins: [
      pluginLess({
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      }),
    ],
  },
});
