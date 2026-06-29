import path from 'node:path';
import { pluginReact } from '@rsbuild/plugin-react';
import { defineConfig } from '@rslib/core';

// 提取公共配置
const commonConfig = {
  syntax: 'es5',
  externalHelpers: true,
  bundle: false,
  output: {
    cleanDistPath: true,
  },
  source: {
    tsconfigPath: './tsconfig.build.json',
    entry: {
      index: ['src/**/*.{ts,tsx}', '!src/**/__tests__/*', '!src/**/demos/**'],
    },
  },
};

export default defineConfig({
  lib: [
    {
      ...commonConfig,
      format: 'esm',
      dts: true,
      output: {
        ...commonConfig.output,
        distPath: {
          root: 'dist/es',
        },
        target: 'web',
      },
    },
    {
      ...commonConfig,
      format: 'cjs',
      dts: false,
      output: {
        ...commonConfig.output,
        distPath: {
          root: 'dist/lib',
        },
        target: 'node',
      },
    },
  ],
  output: {
    cleanDistPath: true,
  },
  plugins: [pluginReact()],
  resolve: {
    alias: {
      '@components': path.resolve(process.cwd(), './src'),
    },
  },
});
