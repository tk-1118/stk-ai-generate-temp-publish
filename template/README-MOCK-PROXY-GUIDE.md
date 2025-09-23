# Mock 与 Proxy 共存配置指南

本项目支持在开发环境中同时使用 Mock 数据和真实接口代理，通过环境变量进行灵活控制。

## 🚀 快速开始

### 1. 创建环境变量文件

在项目根目录创建 `.env.development` 或 `.env.local` 文件：

```bash
# 是否启用代理（true: 使用真实接口代理，false: 使用 Mock 数据）
VITE_USE_PROXY=false
```

### 2. 使用模式

#### 纯 Mock 模式（默认）
```bash
# .env.development
VITE_USE_PROXY=false
```

- 所有 API 请求使用 Mock 数据
- Mock 接口路径：`/api/*`
- 适用于：前端独立开发、接口未就绪、离线开发

#### 代理模式
```bash
# .env.development  
VITE_USE_PROXY=true
```

- 真实接口通过代理访问：`/api/*` → `http://localhost:81`
- Mock 接口使用不同前缀：`/mock/*`
- 适用于：联调真实接口、部分接口使用 Mock

## 🔧 配置说明

### Vite 配置 (vite.config.ts)

```typescript
export default defineConfig(({ mode }) => {
  // 根据环境变量决定是否启用代理
  const enableProxy = process.env.VITE_USE_PROXY === 'true';
  
  return {
    server: {
      // 只有当 VITE_USE_PROXY=true 时才启用代理
      proxy: enableProxy ? {
        "/api": {
          target: "http://localhost:81",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      } : undefined
    }
  };
});
```

### Mock 配置

Mock 数据会根据环境变量自动选择路径前缀：

```typescript
// 自动根据环境变量选择前缀
const useProxy = import.meta.env.VITE_USE_PROXY === 'true';
const mockPrefix = useProxy ? '/mock' : '/api';

// Mock 接口注册
Mock.mock(`${mockPrefix}/user/info`, 'get', () => {
  // Mock 数据
});
```

## 📝 使用场景

### 场景 1：纯前端开发
```bash
VITE_USE_PROXY=false
npm run dev
```
所有接口使用 Mock 数据，无需后端服务。

### 场景 2：联调真实接口
```bash
VITE_USE_PROXY=true
npm run dev
```
- `/api/*` 请求代理到真实后端
- `/mock/*` 请求使用 Mock 数据
- 可以混合使用真实接口和 Mock 接口

### 场景 3：部分接口联调
在代理模式下，如果需要某些接口使用 Mock 数据：

```javascript
// 前端请求时使用 /mock 前缀
fetch('/mock/user/info')  // 使用 Mock 数据
fetch('/api/user/list')   // 使用真实接口
```

### 场景 4：前端页面动态路径适配
前端页面组件自动适配不同模式的接口路径：

```vue
<template>
  <!-- 文件上传组件自动适配路径 -->
  <el-upload :action="uploadActionUrl" />
  
  <!-- API 测试按钮 -->
  <el-button @click="testApi">测试接口</el-button>
</template>

<script setup>
import { computed } from 'vue'

// 动态上传路径
const uploadActionUrl = computed(() => {
  const useProxy = import.meta.env.VITE_USE_PROXY === 'true'
  const mockPrefix = useProxy ? '/mock' : '/api'
  return `${mockPrefix}/project/register/uploadApprovalFile`
})

// 动态 API 前缀
const apiPrefix = computed(() => {
  const useProxy = import.meta.env.VITE_USE_PROXY === 'true'
  return useProxy ? '/mock' : '/api'
})

const testApi = async () => {
  // 自动使用正确的前缀
  const res = await http.get(`${apiPrefix.value}/error/auth`)
}
</script>
```

## 🛠️ 开发建议

1. **开发初期**：使用纯 Mock 模式进行前端开发
2. **接口联调**：切换到代理模式，逐步替换 Mock 接口
3. **问题排查**：可以快速切换模式对比接口行为
4. **团队协作**：不同开发者可以使用不同模式
5. **前端适配**：页面组件使用 `computed` 动态获取接口前缀，避免硬编码路径
6. **文件上传**：使用 `:action="uploadActionUrl"` 而不是硬编码的 `action="/api/..."`
7. **API 测试**：测试页面使用动态前缀，确保在不同模式下都能正常工作

## 📋 环境变量参考

| 变量名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `VITE_USE_PROXY` | boolean | `false` | 是否启用代理模式 |

## 🔍 调试技巧

1. **查看 Mock 状态**：
   ```
   打开浏览器控制台，查看 Mock 初始化日志：
   [Mock] 启用 Mock 数据
   [Mock] 使用路径前缀: /api (纯Mock模式)
   或
   [Mock] 使用路径前缀: /mock (代理模式)
   ```

2. **网络面板**：
   - 纯 Mock 模式：请求显示为 XHR，状态码 200
   - 代理模式：请求会显示实际的网络请求

3. **快速切换**：
   修改 `.env.development` 文件后重启开发服务器即可切换模式

## ⚠️ 注意事项

1. 修改环境变量后需要重启开发服务器
2. 代理模式下确保后端服务正常运行
3. Mock 接口路径变化时，前端请求路径也需要相应调整
4. 生产环境不会加载 Mock 数据
