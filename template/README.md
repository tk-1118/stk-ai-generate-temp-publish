# Hehe Product Foo

> 基于 Hehe Shell Platform 的企业级前端产品子包，支持独立部署和微前端集成

## 项目概述

Hehe Product Foo 是一个现代化的前端应用，采用 Vue 3 + TypeScript 技术栈，具备完整的工程化配置和开发规范。项目支持独立运行和作为微前端子应用集成到 Hehe Shell Platform 中。

### 核心特性

- 🚀 **现代技术栈**: Vue 3 + TypeScript + Vite + Pinia
- 🎨 **统一设计系统**: 基于 Element Plus 和 Hehe UI Components
- 📦 **微前端支持**: 可独立运行或集成到 Shell Platform
- 🔧 **工程化配置**: 完整的构建、测试、部署流程
- 🌈 **主题系统**: 支持多主题切换
- 🔌 **Mock 系统**: 完整的数据模拟支持，支持与真实接口代理共存，内置详细的控制台日志记录
- 📡 **API 标准化**: 统一的 API 响应格式和错误处理
- 🔒 **权限管理**: 完整的认证授权体系
- 🧭 **动态菜单系统**: 基于配置的智能菜单生成和权限控制

## 技术架构

### 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Vue | ^3.5.21 | 前端框架 |
| TypeScript | ^5.9.2 | 类型系统 |
| Vite | ^7.1.5 | 构建工具 |
| Pinia | ^3.0.3 | 状态管理 |
| Vue Router | ^4.5.1 | 路由管理 |
| Element Plus | ^2.11.2 | UI 组件库 |
| Axios | ^1.12.2 | HTTP 客户端 |
| MockJS | ^1.1.0 | 数据模拟 |
| Sass | ^1.92.1 | CSS 预处理器 |

### 项目结构

```
hehe-product-foo/
├── hehe-infra-versions/          # 基础设施版本管理 (SSOT)
│   ├── package.json
│   └── versions.json             # 统一版本配置
├── scripts/
│   ├── sync-hehe-infra-versions.js   # 版本同步脚本 (ES)
│   └── sync-hehe-infra-versions.cjs  # 版本同步脚本 (CJS)
├── src/
│   ├── api/                      # API 层
│   │   ├── __examples__/         # API 使用示例
│   │   ├── project/              # 项目相关 API
│   │   │   └── registration/     # 项目登记相关接口
│   │   │       ├── list.ts       # 项目列表接口
│   │   │       ├── detail.ts     # 项目详情接口
│   │   │       └── fillProjectInfo.api.ts # 项目信息填写接口
│   │   ├── error-map.ts          # 错误码映射
│   │   ├── http.ts               # HTTP 客户端配置
│   │   ├── types.ts              # API 类型定义
│   │   └── user.ts               # 用户相关 API
│   ├── app/                      # 应用入口
│   │   ├── app.vue               # 根组件
│   │   └── main.ts               # 应用入口文件
│   ├── auth/                     # 认证授权
│   │   ├── permission.ts         # 权限管理
│   │   └── token.ts              # Token 管理
│   ├── bridge/                   # 微前端通信桥接
│   │   └── index.ts              # iframe 通信
│   ├── components/               # 通用组件
│   │   ├── MenuItemRenderer.vue  # 动态菜单项渲染组件
│   │   └── MenuDemo.vue          # 菜单演示组件
│   ├── composables/              # 组合式函数
│   │   └── useMenu.ts            # 菜单管理组合函数
│   ├── config/                   # 配置文件
│   │   └── menu.ts               # 动态菜单配置
│   ├── layouts/                  # 布局组件
│   │   └── Layout.vue            # 主布局组件
│   ├── mocks/                    # Mock 数据
│   │   ├── project/              # 项目相关 Mock
│   │   │   ├── registration/     # 项目登记 Mock
│   │   │   │   └── list.mock.ts  # 项目列表 Mock
│   │   │   ├── register/         # 项目注册 Mock
│   │   │   │   └── fillProjectInfo.mock.ts # 项目信息填写 Mock
│   │   │   └── detail.mock.ts    # 项目详情 Mock
│   │   ├── index.ts              # Mock 配置和注册中心 （mocks实现的模拟接口一定要在src/mocks/index.ts 中注册）
│   │   ├── mock-utils.ts         # Mock 工具函数（含代理模式支持）
│   │   └── user.mock.ts          # 用户数据模拟
│   ├── pages/                    # 页面组件 (页面组件必须建在pages 目录下， 不要创建到其他目录,如：src/views/**/*.vue)
│   │   ├── ApiTest.vue           # API 测试页面
│   │   ├── Detail.vue            # 详情页面
│   │   ├── Home.vue              # 首页
│   │   └── MenuDemo.vue          # 菜单演示页面
│   ├── router/                   # 路由配置
│   │   ├── guards.ts             # 路由守卫
│   │   └── index.ts              # 路由配置
│   ├── store/                    # 状态管理
│   │   ├── index.ts              # Store 配置
│   │   └── user.ts               # 用户状态
│   ├── styles/                   # 样式文件
│   │   ├── index.scss            # 主样式文件
│   │   └── reset.css             # 样式重置
│   └── types/                    # 类型定义
│       └── menu.ts               # 菜单类型定义
├── README-API-RESULT-GUIDE.md    # API 标准化指南
├── README-MOCK-GUIDE.md          # Mock 数据指南
├── README-THEME.md               # 主题指南
├── package.json                  # 项目依赖配置
└── vite.config.ts                # Vite 构建配置（支持环境变量控制代理）
```

## 开发指南

### 环境要求

- Node.js >= 16.0.0
- pnpm >= 8.0.0

### 快速开始

```bash
# 1. 克隆项目
git clone <repository-url>
cd hehe-product-foo

# 2. 安装依赖 (会自动同步版本)
pnpm install

# 3. 启动开发服务器
pnpm dev

# 4. 构建项目
pnpm build

# 5. 类型检查
pnpm typecheck

# 6. 预览构建结果
pnpm preview
```

### 开发脚本

| 命令 | 说明 |
|------|------|
| `pnpm dev` | 启动开发服务器 |
| `pnpm build` | 构建生产版本 |
| `pnpm preview` | 预览构建结果 |
| `pnpm typecheck` | TypeScript 类型检查 |

## 开发规范

### 代码规范

#### 1. 文件命名

- **组件文件**: PascalCase (如: `UserProfile.vue`)
- **工具文件**: kebab-case (如: `api-utils.ts`)
- **页面文件**: PascalCase (如: `UserDetail.vue`)
- **目录名**: kebab-case (如: `user-management/`)

#### 2. 组件开发

```vue
<template>
  <div class="user-profile">
    <h2>{{ user.name }}</h2>
    <p>{{ user.email }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { User } from '@/api/types'

// Props 定义
interface Props {
  userId: string
}

const props = defineProps<Props>()

// 响应式数据
const user = ref<User | null>(null)
const loading = ref(false)

// 生命周期
onMounted(() => {
  loadUserInfo()
})

// 方法
const loadUserInfo = async () => {
  loading.value = true
  try {
    // API 调用
  } catch (error) {
    console.error('加载用户信息失败:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.user-profile {
  padding: 20px;
  
  h2 {
    color: var(--el-text-color-primary);
    margin-bottom: 10px;
  }
}
</style>
```

#### 3. API 开发规范

```typescript
// src/api/user.ts
import { http } from './http'
import type { ApiResult } from './types'

export interface UserInfo {
  id: string
  name: string
  email: string
  avatar?: string
}

export interface UserListParams {
  page?: number
  size?: number
  keyword?: string
}

// 获取用户信息
export function getUserInfo(id: string): Promise<ApiResult<UserInfo>> {
  return http.get<UserInfo>(`/api/user/${id}`)
}

// 获取用户列表
export function getUserList(params: UserListParams): Promise<ApiResult<UserInfo[]>> {
  return http.get<UserInfo[]>('/api/user/list', params)
}

// 更新用户信息
export function updateUserInfo(id: string, data: Partial<UserInfo>): Promise<ApiResult<UserInfo>> {
  return http.put<UserInfo>(`/api/user/${id}`, data)
}
```

#### 4. Store 开发规范

```typescript
// src/store/user.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { UserInfo } from '@/api/types'
import { getUserInfo } from '@/api/user'

export const useUserStore = defineStore('user', () => {
  // State
  const userInfo = ref<UserInfo | null>(null)
  const loading = ref(false)

  // Getters
  const isLoggedIn = computed(() => !!userInfo.value)
  const userName = computed(() => userInfo.value?.name ?? '未知用户')

  // Actions
  const fetchUserInfo = async (id: string) => {
    loading.value = true
    try {
      const res = await getUserInfo(id)
      if (res.success) {
        userInfo.value = res.data
      }
    } catch (error) {
      console.error('获取用户信息失败:', error)
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    userInfo.value = null
  }

  return {
    userInfo,
    loading,
    isLoggedIn,
    userName,
    fetchUserInfo,
    logout
  }
})
```

#### 5. 动态菜单系统规范

项目采用动态菜单系统，新增页面时需要同时配置路由和菜单：

```typescript
// 1. 在 src/config/menu.ts 中添加菜单配置
export const menuConfig: MenuConfig = {
  items: [
    {
      key: 'user-management',
      title: '用户管理',
      path: '/user-management',
      icon: User,
      order: 10,
      requireAuth: true,
      description: '用户信息管理页面',
      children: [
        {
          key: 'user-list',
          title: '用户列表',
          path: '/user-management/list',
          icon: List,
          order: 1
        }
      ]
    }
  ]
}

// 2. 在 src/router/index.ts 中添加对应路由
{
  path: "user-management",
  name: "user-management",
  component: () => import("@/pages/UserManagement.vue"),
  meta: { title: "用户管理", auth: true }
}

// 3. 使用菜单组合函数
import { useMenu } from '@/composables/useMenu'

const { filteredMenuItems, activeMenuKey } = useMenu()
```

**菜单配置字段说明：**
- `key`: 菜单唯一标识，用于路由匹配
- `title`: 菜单显示名称
- `path`: 对应的路由路径
- `icon`: Element Plus 图标组件
- `order`: 排序权重，数字越小越靠前
- `requireAuth`: 是否需要登录权限
- `hidden`: 是否隐藏菜单项
- `children`: 子菜单配置
- `description`: 菜单描述，用于提示

### 样式规范

#### 1. 样式组织

```scss
// src/styles/index.scss
@import './variables';
@import './mixins';
@import './components';

// 全局样式
body {
  font-family: var(--el-font-family);
  background-color: var(--el-bg-color-page);
}

// 工具类
.text-center { text-align: center; }
.mb-20 { margin-bottom: 20px; }
```

#### 2. 组件样式

```scss
<style lang="scss" scoped>
.user-card {
  padding: 20px;
  border-radius: 8px;
  background: var(--el-bg-color);
  box-shadow: var(--el-box-shadow-light);
  
  &__header {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  }
  
  &__title {
    font-size: 18px;
    font-weight: 600;
    color: var(--el-text-color-primary);
  }
  
  // 响应式设计
  @media (max-width: 768px) {
    padding: 16px;
  }
}
</style>
```

### Mock 数据规范 (强制执行：必须仔细阅读，并遵守此规范)

参考以下文档了解完整的 Mock 数据开发规范：
- [README-MOCK-GUIDE.md](./README-MOCK-GUIDE.md) - Mock 数据指南

### Mock 与代理共存配置

项目支持 Mock 数据与真实接口代理的灵活切换，通过环境变量进行控制：

#### 快速配置

```bash
# 创建环境变量文件
echo "VITE_USE_PROXY=false" > .env.development  # 纯 Mock 模式
# 或
echo "VITE_USE_PROXY=true" > .env.development   # 代理模式
```

#### 使用模式

1. **纯 Mock 模式** (`VITE_USE_PROXY=false`)
   - 所有接口使用 Mock 数据
   - Mock 接口路径：`/api/*`
   - 适用于：前端独立开发、接口未就绪

2. **代理模式** (`VITE_USE_PROXY=true`)
   - 真实接口通过代理访问：`/api/*` → `http://localhost:81`
   - Mock 接口使用不同前缀：`/mock/*`
   - 适用于：联调真实接口、部分接口使用 Mock

### API 规范 (强制执行：必须仔细阅读，并遵守此规范)

参考 [README-API-RESULT-GUIDE.md](./README-API-RESULT-GUIDE.md) 了解完整的 API 开发规范。

## 依赖管理

### 版本管理策略

本项目采用统一版本管理策略，所有依赖版本在 `hehe-infra-versions/versions.json` 中集中管理：

```json
{
  "infraPeers": {
    "vue": "^3.5.22",
    "vue-router": "^4.5.1",
    "pinia": "^3.0.3"
  },
  "devExact": {
    "vite": "^7.1.5",
    "typescript": "^5.9.2"
  },
  "overrides": {
    "vue": "^3.5.22"
  },
  "banned": [
    "normalize.css",
    "reset.css"
  ]
}
```

### 版本同步

```bash
# 手动同步版本
node scripts/sync-hehe-infra-versions.cjs

# 自动同步 (preinstall 钩子)
pnpm install
```

### 升级流程

1. 修改 `hehe-infra-versions/versions.json`
2. 运行 `pnpm install` 同步到 `package.json`
3. 测试功能完整性
4. 提交版本更改

## 部署指南

### 独立部署

```bash
# 构建
pnpm build

# 部署到静态服务器
cp -r dist/* /var/www/html/
```

### 微前端集成

项目支持作为微前端子应用集成到 Hehe Shell Platform：

1. **iframe 通信**: 通过 `src/bridge/index.ts` 实现与父应用通信
2. **路由配置**: 使用 Hash 路由避免冲突
3. **样式隔离**: 组件样式使用 scoped 作用域

### Docker 部署

```dockerfile
FROM nginx:alpine
COPY dist/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 最佳实践

### 1. 性能优化

- 使用 `defineAsyncComponent` 实现组件懒加载
- 合理使用 `computed` 和 `watchEffect`
- 避免在模板中使用复杂计算
- 使用 `v-memo` 优化列表渲染

### 2. 错误处理

```typescript
// 全局错误处理
app.config.errorHandler = (err, vm, info) => {
  console.error('全局错误:', err, info)
  // 发送错误到监控系统
}

// API 错误处理
try {
  const res = await api.getUserInfo(id)
  if (!res.success) {
    ElMessage.error(res.msg)
    return
  }
  // 处理成功响应
} catch (error) {
  console.error('API 调用失败:', error)
  ElMessage.error('网络错误，请稍后重试')
}
```

### 3. 类型安全

```typescript
// 严格类型定义
interface ApiResponse<T> {
  code: number
  success: boolean
  data: T
  msg?: string
}

// 使用泛型
function createApiClient<T>() {
  return {
    get: (url: string): Promise<ApiResponse<T>> => {
      // 实现
    }
  }
}
```

### 4. 测试策略

```typescript
// 组件测试
import { mount } from '@vue/test-utils'
import UserProfile from '@/components/UserProfile.vue'

describe('UserProfile', () => {
  it('应该正确显示用户信息', () => {
    const wrapper = mount(UserProfile, {
      props: { user: { name: '张三', email: 'test@example.com' } }
    })
    
    expect(wrapper.text()).toContain('张三')
    expect(wrapper.text()).toContain('test@example.com')
  })
})
```

## 故障排除

### 常见问题

1. **依赖版本冲突**
   ```bash
   # 清理依赖
   rm -rf node_modules pnpm-lock.yaml
   pnpm install
   ```

2. **类型错误**
   ```bash
   # 重新生成类型文件
   pnpm typecheck
   ```

3. **构建失败**
   ```bash
   # 检查构建配置
   pnpm build --debug
   ```

### 开发调试

```typescript
// 开发环境调试
if (import.meta.env.DEV) {
  console.log('调试信息:', data)
  window.__DEBUG__ = { store, router }
}
```

## 贡献指南

### 提交规范

使用 Conventional Commits 规范：

```
feat: 添加用户管理功能
fix: 修复登录状态异常问题
docs: 更新 API 文档
style: 优化代码格式
refactor: 重构用户服务
test: 添加单元测试
chore: 更新依赖版本
```

### Pull Request

1. 创建功能分支: `git checkout -b feature/user-management`
2. 提交变更: `git commit -m "feat: 添加用户管理功能"`
3. 推送分支: `git push origin feature/user-management`
4. 创建 Pull Request

## 许可证

本项目采用 MIT 许可证。详见 [LICENSE](./LICENSE) 文件。