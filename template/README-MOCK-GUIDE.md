# Mock 数据指南

## 概述

Mock 数据已全面改造为统一的 `ApiResult<T>` 格式，与真实 API 响应保持一致。项目支持 Mock 数据与真实接口代理的灵活共存，通过环境变量进行智能切换。

### 🆕 Mock 请求日志功能

由于 `mockjs` 直接在 JavaScript 层面拦截请求，浏览器的 Network 面板无法看到这些请求。为了解决这个问题，我们新增了详细的控制台日志记录功能，让你能够清楚地看到所有被 Mock 拦截的请求信息，包括：

- 请求方法、URL、时间戳
- HTTP 状态码和状态文本  
- 请求体和响应数据
- 模拟的网络耗时
- 美观的控制台输出格式

## 核心文件

### 1. `src/mocks/mock-utils.ts` - Mock 工具函数
提供标准化的 Mock 响应创建工具：

```typescript
// 成功响应（自动记录日志）
mockSuccess(data, msg, options) // 返回 ApiResult<T>，自动记录请求日志

// 失败响应（自动记录日志）
mockError(errorCode, msg, code, options) // 返回失败的 ApiResult，自动记录请求日志

// 预设错误（自动记录日志）
mockAuthError(options)      // 401 权限错误，自动记录日志
mockForbiddenError(options) // 403 无权限错误，自动记录日志
mockServerError(options)    // 500 服务器错误，自动记录日志

// 🆕 获取 Mock 路径前缀（支持代理模式）
getMockPrefix()      // 根据环境变量返回 '/api' 或 '/mock'

// 🆕 Mock 请求日志记录
logMockRequest(options, response) // 记录详细的请求日志到控制台
```

### 2. `src/mocks/index.ts` - 通用 Mock 数据和注册中心
- 用户信息：`${mockPrefix}/user/info` (使用正则表达式匹配)
- 产品详情：`${mockPrefix}/detail/:id` (使用正则表达式匹配)
- 列表数据：`/foo/list` (使用正则表达式匹配)
- 错误场景测试端点：`${mockPrefix}/error/*` (使用正则表达式匹配)
- **Mock 模块注册**：导入其他 Mock 文件（如 `./project/register/fillProjectInfo.mock`）

### 3. `src/mocks/user.mock.ts` - 用户相关 Mock
- 登录：`${mockPrefix}/user/login` (使用正则表达式匹配，支持错误模拟)
- 登出：`${mockPrefix}/user/logout` (使用正则表达式匹配)
- 用户列表：`${mockPrefix}/user/list` (使用正则表达式匹配)
- 用户详情：`${mockPrefix}/user/:id` (使用正则表达式匹配)

### 4. `src/mocks/project/` - 业务模块 Mock
- **项目登记**：`registration/list.mock.ts`
  - 项目列表：`POST ${mockPrefix}/projectregistration/registrationprojectbiz/registrationproject/queryProjectRegistrationByPage` (使用正则表达式匹配)
  - 项目删除：`POST ${mockPrefix}/projectregistration/registrationprojectbiz/registrationproject/deleteProjectRegistration` (使用正则表达式匹配)
- **项目详情**：`detail.mock.ts`
  - 项目详情：`POST ${mockPrefix}/projectregistration/registrationprojectbiz/registrationproject/queryProjectRegistration` (使用正则表达式匹配)
- **项目注册**：`register/fillProjectInfo.mock.ts`
  - 华能组织机构列表：`${mockPrefix}/project/register/getHuanengOrgList` (使用正则表达式匹配)
  - 项目信息保存：`${mockPrefix}/project/register/saveBasicInfo` (使用正则表达式匹配)
  - 法人信息保存：`${mockPrefix}/project/register/saveLegalInfo` (使用正则表达式匹配)
  - 资金构成管理：`${mockPrefix}/project/register/getFundList` (使用正则表达式匹配)、`${mockPrefix}/project/register/saveFundInfo` (使用正则表达式匹配)
  - 文件上传：`${mockPrefix}/project/register/importFundTemplate` (使用正则表达式匹配)、`${mockPrefix}/project/register/uploadApprovalFile` (使用正则表达式匹配)
  - 项目提交：`POST ${mockPrefix}/projectregistration/registrationprojectbiz/registrationproject/registerProject` (使用正则表达式匹配)

> **注意**：所有接口路径会根据 `VITE_USE_PROXY` 环境变量自动调整前缀（`/api` 或 `/mock`）

## ⚠️ 重要规范：必须使用正则表达式

**所有 Mock 接口都必须使用正则表达式的形式来编写 URL**，这是项目的强制要求：

### ✅ 正确写法（推荐）
```javascript
// GET 请求 - 支持查询参数
Mock.mock(new RegExp(`${mockPrefix.replace('/', '\\/')}\\/api\\/path.*`), 'get', handler)

// POST 请求 - 支持各种参数
Mock.mock(new RegExp(`${mockPrefix.replace('/', '\\/')}\\/api\\/path.*`), 'post', handler)
```

### ❌ 错误写法（禁止）
```javascript
// 字符串形式 - 不支持查询参数，容易出错
Mock.mock(`${mockPrefix}/api/path`, 'get', handler)
```

### 为什么必须使用正则表达式？

1. **支持查询参数**：GET 请求后面可能拼接参数（如 `?param=value&other=123`）
2. **更好的兼容性**：可以处理各种 URL 变体和特殊情况
3. **避免匹配失败**：字符串匹配在遇到查询参数时会失败
4. **统一规范**：确保所有接口都有一致的匹配行为

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

### 创建新的 Mock 接口（支持代理模式和日志记录）

```typescript
import { mockSuccess, mockError, getMockPrefix } from './mock-utils';

const mockPrefix = getMockPrefix(); // 🆕 获取动态前缀

// ✅ 正确写法：使用正则表达式
Mock.mock(new RegExp(`${mockPrefix.replace('/', '\\/')}\\/your-endpoint.*`), 'get', (options: any) => {
  // 成功场景（自动记录日志）
  return mockSuccess({
    id: Mock.mock('@id'),
    name: Mock.mock('@cname')
  }, '操作成功', options); // 🆕 传递 options 参数用于日志记录
});

Mock.mock(new RegExp(`${mockPrefix.replace('/', '\\/')}\\/error-endpoint.*`), 'get', (options: any) => {
  // 失败场景（自动记录日志）
  return mockError('YOUR_ERROR_CODE', '自定义错误信息', 400, options); // 🆕 传递 options 参数
});
```

### 带参数验证的 Mock

```typescript
const mockPrefix = getMockPrefix(); // 🆕 支持代理模式

// ✅ 正确写法：使用正则表达式
Mock.mock(new RegExp(`${mockPrefix.replace('/', '\\/')}\\/login.*`), 'post', (options: any) => {
  const body = JSON.parse(options.body || '{}');
  
  if (!body.username || !body.password) {
    return mockError('LOGIN_INVALID', '用户名或密码不能为空', 400, options); // 🆕 传递 options
  }
  
  return mockSuccess({
    token: Mock.mock('@guid'),
    userInfo: { /* ... */ }
  }, '登录成功', options); // 🆕 传递 options 用于日志记录
});
```

### 动态路由 Mock

```typescript
const mockPrefix = getMockPrefix(); // 🆕 支持代理模式

Mock.mock(new RegExp(`${mockPrefix.replace('/', '\\/')}\\/user\\/\\d+`), 'get', (options: any) => {
  const id = options.url.match(new RegExp(`${mockPrefix.replace('/', '\\/')}\\/user\\/(\\d+)`))?.[1];
  
  if (!id) {
    return mockError('USER_NOT_FOUND', '用户不存在', 404, options); // 🆕 传递 options
  }
  
  return mockSuccess({
    id: parseInt(id),
    name: Mock.mock('@cname')
  }, '获取用户详情成功', options); // 🆕 传递 options 用于日志记录
});
```

### 复杂业务场景 Mock

```typescript
const mockPrefix = getMockPrefix(); // 🆕 支持代理模式

// 文件上传 Mock（来自实际项目，自动记录日志）
// ✅ 正确写法：使用正则表达式
Mock.mock(new RegExp(`${mockPrefix.replace('/', '\\/')}\\/project\\/register\\/uploadApprovalFile.*`), 'post', (options: any) => {
  try {
    // 模拟文件上传处理
    console.log('上传项目审批文件:', options);
    return mockSuccess(null, '上传成功', options); // 🆕 传递 options 用于日志记录
  } catch (error) {
    return mockError('UPLOAD_APPROVAL_FILE_ERROR', '上传项目审批文件失败', 500, options); // 🆕 传递 options
  }
});

// 带查询参数的 Mock
// ✅ 正确写法：使用正则表达式
Mock.mock(new RegExp(`${mockPrefix.replace('/', '\\/')}\\/project\\/register\\/getFundList.*`), 'get', (options: any) => {
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
    ], '获取成功', options); // 🆕 传递 options 用于日志记录
  } catch (error) {
    return mockError('GET_FUND_LIST_ERROR', '获取项目资金构成列表失败', 500, options); // 🆕 传递 options
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
- `${mockPrefix}/error/auth` - 401 权限错误
- `${mockPrefix}/error/server` - 500 服务器错误
- `${mockPrefix}/error/business` - 400 业务错误

### 在测试页面验证
访问 `/api-test` 页面，使用以下功能验证各种场景：
- **Mock 数据测试** 按钮组：验证各种响应场景
- **Mock 日志测试** 按钮组：测试日志记录功能，请打开浏览器控制台查看详细的请求日志

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
- **必须使用正则表达式**：所有 Mock 接口都必须使用 `new RegExp()` 形式
- 使用 `mockSuccess()` 和 `mockError()` 创建响应
- 为不同场景提供对应的错误码
- 添加有意义的提示信息
- 模拟真实的参数验证逻辑
- 🆕 **传递 `options` 参数**：确保所有 Mock 函数都接收 `options` 参数并传递给响应函数，以启用日志记录功能

### ❌ 禁止做法
- **禁止使用字符串形式的 URL**：`Mock.mock('${mockPrefix}/api/path', ...)` 是错误的写法
- 直接返回原始对象，不符合 ApiResult 格式
- 使用无意义的错误码或提示
- 忽略参数验证逻辑
- 🆕 **忘记传递 `options` 参数**：这会导致无法记录请求日志，影响开发调试体验

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
- 🆕 **详细的请求日志**: 解决了 mockjs 无法在 Network 面板查看请求的问题
- 🆕 **强制正则表达式规范**: 所有接口必须使用正则表达式，确保查询参数支持
