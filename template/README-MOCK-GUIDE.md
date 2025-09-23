# Mock 数据指南

## 概述

Mock 数据已全面改造为统一的 `ApiResult<T>` 格式，与真实 API 响应保持一致。项目支持 Mock 数据与真实接口代理的灵活共存，通过环境变量进行智能切换。

## 核心文件

### 1. `src/mocks/mock-utils.ts` - Mock 工具函数
提供标准化的 Mock 响应创建工具：

```typescript
// 成功响应
mockSuccess(data, msg) // 返回 ApiResult<T>

// 失败响应
mockError(errorCode, msg, code) // 返回失败的 ApiResult

// 预设错误
mockAuthError()      // 401 权限错误
mockForbiddenError() // 403 无权限错误
mockServerError()    // 500 服务器错误

// 🆕 获取 Mock 路径前缀（支持代理模式）
getMockPrefix()      // 根据环境变量返回 '/api' 或 '/mock'
```

### 2. `src/mocks/index.ts` - 通用 Mock 数据和注册中心
- 用户信息：`/api/user/info`
- 产品详情：`/api/detail/:id`
- 列表数据：`/foo/list`
- 错误场景测试端点：`/api/error/*`
- **Mock 模块注册**：导入其他 Mock 文件（如 `./project/register/fillProjectInfo.mock`）

### 3. `src/mocks/user.mock.ts` - 用户相关 Mock
- 登录：`/api/user/login` (支持错误模拟)
- 登出：`/api/user/logout`
- 用户列表：`/api/user/list`
- 用户详情：`/api/user/:id`

### 4. `src/mocks/project/` - 业务模块 Mock
- **项目登记**：`registration/list.mock.ts`
  - 项目列表：`POST /api/projectregistration/registrationprojectbiz/registrationproject/queryProjectRegistrationByPage`
  - 项目删除：`POST /api/projectregistration/registrationprojectbiz/registrationproject/deleteProjectRegistration`
- **项目详情**：`detail.mock.ts`
  - 项目详情：`POST /api/projectregistration/registrationprojectbiz/registrationproject/queryProjectRegistration`
- **项目注册**：`register/fillProjectInfo.mock.ts`
  - 华能组织机构列表：`/api/project/register/getHuanengOrgList`
  - 项目信息保存：`/api/project/register/saveBasicInfo`
  - 法人信息保存：`/api/project/register/saveLegalInfo`
  - 资金构成管理：`/api/project/register/getFundList`、`/api/project/register/saveFundInfo`
  - 文件上传：`/api/project/register/importFundTemplate`、`/api/project/register/uploadApprovalFile`
  - 项目提交：`POST /api/projectregistration/registrationprojectbiz/registrationproject/registerProject`

> **注意**：所有接口路径会根据 `VITE_USE_PROXY` 环境变量自动调整前缀（`/api` 或 `/mock`）

## Mock 响应格式

### 成功响应示例
```json
{
  "code": 200,
  "success": true,
  "data": {
    "id": "123456",
    "name": "张三",
    "email": "zhangsan@example.com"
  },
  "msg": "获取用户信息成功",
  "errorCode": ""
}
```

### 失败响应示例
```json
{
  "code": 400,
  "success": false,
  "data": null,
  "msg": "用户名或密码不能为空",
  "errorCode": "LOGIN_INVALID"
}
```

## Mock 文件组织结构

```
src/mocks/
├── index.ts              # 主入口，注册所有 Mock，支持环境变量控制
├── mock-utils.ts         # Mock 工具函数，含 getMockPrefix() 支持
├── user.mock.ts          # 用户相关 Mock
└── project/              # 业务模块 Mock
    ├── registration/     # 项目登记相关
    │   └── list.mock.ts  # 项目列表 Mock（匹配真实接口路径）
    ├── register/         # 项目注册相关
    │   └── fillProjectInfo.mock.ts # 项目信息填写 Mock
    └── detail.mock.ts    # 项目详情 Mock（匹配真实接口路径）
```

### 添加新的 Mock 模块

1. 创建 Mock 文件（如 `src/mocks/your-module.mock.ts`）
2. 在 `src/mocks/index.ts` 中导入：
   ```typescript
   import './your-module.mock';
   ```

## Mock 与代理共存配置

### 🚀 快速开始

```bash
# 1. 纯 Mock 模式（默认）
echo "VITE_USE_PROXY=false" > .env.development
pnpm dev  # 所有接口使用 Mock 数据，路径前缀为 /api

# 2. 代理模式
echo "VITE_USE_PROXY=true" > .env.development  
pnpm dev  # 真实接口使用 /api 前缀，Mock 接口使用 /mock 前缀
```

### 🔧 工作原理

1. **环境变量检测**: `getMockPrefix()` 函数检测 `VITE_USE_PROXY` 环境变量
2. **动态路径前缀**: 
   - `VITE_USE_PROXY=false`: Mock 使用 `/api` 前缀
   - `VITE_USE_PROXY=true`: Mock 使用 `/mock` 前缀
3. **Vite 代理配置**: 只有当 `VITE_USE_PROXY=true` 时才启用代理

### 🎯 使用场景

| 模式 | 环境变量 | Mock 前缀 | 代理状态 | 适用场景 |
|------|----------|-----------|----------|----------|
| 纯 Mock | `VITE_USE_PROXY=false` | `/api` | 禁用 | 前端独立开发、接口未就绪 |
| 代理模式 | `VITE_USE_PROXY=true` | `/mock` | 启用 | 联调真实接口、部分接口使用 Mock |

### 📝 开发控制台提示

启动开发服务器时，控制台会显示当前使用的 Mock 模式：

```
[Mock] 启用 Mock 数据
[Mock] 使用路径前缀: /api (纯Mock模式)
```

或

```
[Mock] 启用 Mock 数据  
[Mock] 使用路径前缀: /mock (代理模式)
```

## 使用方式

### 创建新的 Mock 接口（支持代理模式）

```typescript
import { mockSuccess, mockError, getMockPrefix } from './mock-utils';

const mockPrefix = getMockPrefix(); // 🆕 获取动态前缀

Mock.mock(`${mockPrefix}/your-endpoint`, 'get', () => {
  // 成功场景
  return mockSuccess({
    id: Mock.mock('@id'),
    name: Mock.mock('@cname')
  }, '操作成功');
});

Mock.mock(`${mockPrefix}/error-endpoint`, 'get', () => {
  // 失败场景
  return mockError('YOUR_ERROR_CODE', '自定义错误信息', 400);
});
```

### 带参数验证的 Mock

```typescript
const mockPrefix = getMockPrefix(); // 🆕 支持代理模式

Mock.mock(`${mockPrefix}/login`, 'post', (options: any) => {
  const body = JSON.parse(options.body || '{}');
  
  if (!body.username || !body.password) {
    return mockError('LOGIN_INVALID', '用户名或密码不能为空', 400);
  }
  
  return mockSuccess({
    token: Mock.mock('@guid'),
    userInfo: { /* ... */ }
  }, '登录成功');
});
```

### 动态路由 Mock

```typescript
const mockPrefix = getMockPrefix(); // 🆕 支持代理模式

Mock.mock(new RegExp(`${mockPrefix.replace('/', '\\/')}\\/user\\/\\d+`), 'get', (options: any) => {
  const id = options.url.match(new RegExp(`${mockPrefix.replace('/', '\\/')}\\/user\\/(\\d+)`))?.[1];
  
  if (!id) {
    return mockError('USER_NOT_FOUND', '用户不存在', 404);
  }
  
  return mockSuccess({
    id: parseInt(id),
    name: Mock.mock('@cname')
  }, '获取用户详情成功');
});
```

### 复杂业务场景 Mock

```typescript
const mockPrefix = getMockPrefix(); // 🆕 支持代理模式

// 文件上传 Mock（来自实际项目）
Mock.mock(`${mockPrefix}/project/register/uploadApprovalFile`, 'post', (options: any) => {
  try {
    // 模拟文件上传处理
    console.log('上传项目审批文件:', options);
    return mockSuccess(null, '上传成功');
  } catch (error) {
    return mockError('UPLOAD_APPROVAL_FILE_ERROR', '上传项目审批文件失败', 500);
  }
});

// 带查询参数的 Mock
Mock.mock(`${mockPrefix}/project/register/getFundList`, 'get', (options: any) => {
  try {
    const url = new URL(options.url, 'http://localhost');
    const projectId = url.searchParams.get('projectId');
    console.log('获取项目资金构成列表:', { projectId });
    
    return mockSuccess([
      {
        index: 1,
        fundSource: '财政资金',
        fundAmount: '1000000',
        fundRatio: '40'
      }
    ], '获取成功');
  } catch (error) {
    return mockError('GET_FUND_LIST_ERROR', '获取项目资金构成列表失败', 500);
  }
});
```

### 前端页面中的动态路径使用

```typescript
// Vue 组件中使用动态上传路径
import { computed } from 'vue'

const uploadActionUrl = computed(() => {
  const useProxy = import.meta.env.VITE_USE_PROXY === 'true'
  const mockPrefix = useProxy ? '/mock' : '/api'
  return `${mockPrefix}/project/register/uploadApprovalFile`
})

// 在模板中使用
// <el-upload :action="uploadActionUrl" ...>

// API 测试页面中使用动态前缀
const apiPrefix = computed(() => {
  const useProxy = import.meta.env.VITE_USE_PROXY === 'true'
  return useProxy ? '/mock' : '/api'
})

// 测试接口调用
const res = await http.get(`${apiPrefix.value}/error/auth`)
```

## 测试场景

### 登录测试
- 正常登录：任意用户名密码（除 `error`）
- 登录失败：用户名使用 `error`
- 参数错误：不传用户名或密码

### 错误测试端点
- `/api/error/auth` - 401 权限错误
- `/api/error/server` - 500 服务器错误
- `/api/error/business` - 400 业务错误

### 在测试页面验证
访问 `/api-test` 页面，点击 "Mock 数据测试" 按钮组验证各种场景。

## 错误码规范

### 通用错误码
| 错误码 | 说明 | HTTP状态码 |
|--------|------|-----------|
| `AUTH_401` | 未授权 | 401 |
| `AUTH_403` | 无权限 | 403 |
| `SERVER_5XX` | 服务器错误 | 500 |
| `BIZ_10001` | 业务逻辑错误 | 400 |

### 用户相关错误码
| 错误码 | 说明 | HTTP状态码 |
|--------|------|-----------|
| `LOGIN_INVALID` | 登录参数无效 | 400 |
| `LOGIN_FAILED` | 登录失败 | 400 |
| `LOGIN_ERROR` | 登录处理异常 | 500 |
| `USER_NOT_FOUND` | 用户不存在 | 404 |

### 项目相关错误码
| 错误码 | 说明 | HTTP状态码 |
|--------|------|-----------|
| `SAVE_BASIC_INFO_ERROR` | 保存项目基本信息失败 | 500 |
| `SAVE_LEGAL_INFO_ERROR` | 保存项目法人信息失败 | 500 |
| `GET_FUND_LIST_ERROR` | 获取项目资金构成列表失败 | 500 |
| `SAVE_FUND_INFO_ERROR` | 保存项目资金构成信息失败 | 500 |
| `IMPORT_FUND_TEMPLATE_ERROR` | 导入项目资金构成模板失败 | 500 |
| `UPLOAD_APPROVAL_FILE_ERROR` | 上传项目审批文件失败 | 500 |
| `SUBMIT_PROJECT_ERROR` | 提交项目登记失败 | 500 |

## 开发规范

### ✅ 推荐做法
- 使用 `mockSuccess()` 和 `mockError()` 创建响应
- 为不同场景提供对应的错误码
- 添加有意义的提示信息
- 模拟真实的参数验证逻辑

### ❌ 禁止做法
- 直接返回原始对象，不符合 ApiResult 格式
- 使用无意义的错误码或提示
- 忽略参数验证逻辑

## 与真实 API 的兼容性

Mock 数据现在与真实 API 完全兼容：
- 相同的响应格式 `ApiResult<T>`
- 相同的错误处理机制
- 相同的类型定义

切换 Mock/真实 API 时，前端代码无需任何修改。

## 启用 Mock

### 当前启用机制

在 `src/app/main.ts` 中：

```typescript
// 开发环境 Mock
if (import.meta.env.DEV) {
  const { setupMock } = await import('@/mocks');
  setupMock();
}
```

**注意**：目前是基于 `import.meta.env.DEV` 判断，在开发环境自动启用 Mock。

### 更精确的控制方式

如需要更精确的控制，可修改为：

```typescript
if (import.meta.env.VITE_FEATURE_MOCK === 'true') {
  const { setupMock } = await import('@/mocks');
  setupMock();
}
```

然后通过环境变量 `VITE_FEATURE_MOCK=true` 控制是否启用 Mock。

## 总结

通过这次改造，Mock 数据实现了：
- ✅ 与 ApiResult 格式完全一致
- ✅ 丰富的错误场景模拟
- ✅ 参数验证和业务逻辑模拟
- ✅ 标准化的错误码和提示
- ✅ 与真实 API 无缝切换
- 🆕 **Mock 与代理共存**: 通过环境变量灵活控制
- 🆕 **动态路径前缀**: 自动适配不同开发模式
- 🆕 **接口数据结构同步**: 与 Vue 页面使用完全一致
- 🆕 **真实接口路径对接**: 支持复杂的 RESTful API 路径

## 相关文档

- [README-MOCK-PROXY-GUIDE.md](./README-MOCK-PROXY-GUIDE.md) - Mock 与代理共存详细配置指南
- [README-API-STRUCTURE-MAPPING.md](./README-API-STRUCTURE-MAPPING.md) - 接口数据结构对照表

这确保了开发阶段的数据格式与生产环境完全一致，并支持灵活的开发模式切换，大大提高了开发效率和代码质量。
