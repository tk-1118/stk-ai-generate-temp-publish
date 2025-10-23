# API Result 化实现指南

## 概述

本项目已完成 API Result 化改造，实现了统一的 API 响应格式和错误处理机制。

## 核心文件

### 1. `src/api/types.ts` - 类型定义
- `ApiResult<T>` 接口：统一的 API 响应格式
- `ok()` / `fail()` 工具函数：创建标准响应
- `isOk()` 类型守卫：判断响应是否成功
- `pickData()` 数据提取：一行代码获取数据或抛错
- `ApiError` 类：标准化的 API 错误

### 2. `src/api/error-map.ts` - 错误映射
- 统一处理网络错误、超时、权限等问题
- 自动映射 HTTP 状态码到业务错误码

### 3. `src/api/http.ts` - HTTP 客户端
- 基于 axios 的统一请求处理
- 支持重试、超时、静默请求
- 自动错误提示和统一格式化

### 4. `env.d.ts` - 环境变量类型
- `VITE_API_BASE`: API 基础地址
- `VITE_FEATURE_MOCK`: Mock 功能开关（可选，默认开发环境启用）
- `VITE_FEATURE_EXPORT`: 导出功能开关（可选）

## 使用方法

### 重要说明：API 地址配置

**所有接口地址无需添加 `/api` 前缀**，因为项目已在环境变量中配置了统一的 API 基础地址：

- `VITE_API_BASE` 环境变量已包含 `/api` 前缀
- HTTP 客户端会自动拼接完整地址
- 开发者只需提供接口路径，如：`/user/info`、`/project/list` 等

### 基本 API 调用

```typescript
import { http } from '@/api/http';
import { type ApiResult } from '@/api/types';

// 定义响应类型
interface UserInfo {
  id: string;  // 注意：项目中使用string类型ID
  name: string;
  email: string;
  role: string;
}

// API 函数
export function getUserInfo(): Promise<ApiResult<UserInfo>> {
  return http.get<UserInfo>('/user/info');  // 实际项目中的端点（无需/api前缀，环境变量已配置）
}

// 组件中使用
const handleGetUser = async () => {
  const res = await getUserInfo();
  if (!res.success) {
    ElMessage.error(res.msg || '获取用户信息失败');
    return;
  }
  
  // 类型安全的数据访问
  console.log(res.data.name, res.data.role);
};
```

### 使用 pickData 简化代码

```typescript
import { pickData } from '@/api/types';

// 列表页推荐写法（配合 useQuery 等）
const loadUserList = async () => {
  try {
    const result = await http.get<{list: UserInfo[]}>('/user/list');  // 无需/api前缀
    const users = pickData(result);
    // 直接使用 users.list，失败会自动抛错
    userList.value = users.list;
  } catch (error: any) {
    // 统一错误处理
    ElMessage.error(`加载用户列表失败: ${error.message}`);
    console.error('加载用户列表失败:', error.message);
  }
};

// 实际项目中的使用示例（来自 ApiTest.vue）
const testPickData = async () => {
  try {
    const res = await http.get<{ list: any[] }>('/foo/list');  // 无需/api前缀
    const data = pickData(res); // 这里会抛错如果失败
    ElMessage.success('pickData 测试成功！');
    return data;
  } catch (error: any) {
    ElMessage.error(`pickData 测试失败: ${error.message}`);
  }
};
```

### 高级功能

```typescript
// 重试请求
const res = await http.get('/data', {}, { 
  retry: 2, 
  retryDelayMs: 1000 
});

// 静默请求（不显示错误提示）
const res = await http.post('/log', data, { 
  silent: true 
});

// 自定义超时
const res = await http.get('/slow', {}, { 
  timeout: 30000 
});

// 文件上传示例（来自实际项目）
export function uploadApprovalFile(file: File, fileType: string): Promise<ApiResult<void>> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('fileType', fileType);
  return http.post<void>('/project/register/uploadApprovalFile', formData, {  // 无需/api前缀
    headers: { 'Content-Type': 'multipart/form-data' }
  });
}
```

## API 响应格式

### 成功响应
```json
{
  "code": 200,
  "success": true,
  "data": { /* 实际数据 */ },
  "msg": "操作成功",
  "errorCode": ""
}
```

### 失败响应
```json
{
  "code": 400,
  "success": false,
  "data": null,
  "msg": "请求参数错误",
  "errorCode": "CLIENT_4XX"
}
```

## 错误码说明

| 错误码 | 说明 |
|--------|------|
| `NET_TIMEOUT` | 请求超时 |
| `NET_CANCELED` | 请求被取消 |
| `AUTH_401` | 未登录或登录过期 |
| `AUTH_403` | 无权限访问 |
| `RATE_LIMIT` | 请求过于频繁 |
| `SERVER_5XX` | 服务器错误 |
| `CLIENT_4XX` | 客户端请求错误 |
| `NET_UNKNOWN` | 网络异常 |

## 开发规则

### ✅ 推荐做法
- 所有 API 函数必须返回 `Promise<ApiResult<T>>`
- 组件中使用 `if (!res.success)` 判断失败
- 列表/组合式场景使用 `pickData()`
- 使用 `http.get/post/put/del` 方法

### ❌ 禁止做法
- 直接使用 `axios.xxx`
- 自定义异常格式
- 忽略错误处理
- 修改核心 HTTP 拦截器逻辑

## 测试验证

访问 `/api-test` 页面可以测试各种场景：
- 成功响应处理（`/foo/list` 端点）
- 错误响应处理（`/nonexistent` 端点，无需/api前缀）  
- 超时处理（自定义 timeout: 1000ms）
- pickData 功能（自动抛错机制）
- Mock 数据测试（权限、服务器、业务错误等）

测试页面位置：`src/pages/ApiTest.vue`

## Mock 数据启用

### 当前启用机制

在 `src/app/main.ts` 中：

```typescript
// 开发环境 Mock
if (import.meta.env.DEV) {
  const { setupMock } = await import('@/mocks');
  setupMock();
}
```

**注意**：目前是基于 `import.meta.env.DEV` 判断，在开发环境自动启用 Mock。如需要更精确的控制，可修改为：

```typescript
if (import.meta.env.VITE_FEATURE_MOCK === 'true') {
  const { setupMock } = await import('@/mocks');
  setupMock();
}
```

## 迁移指南

如果你有现有的 API 调用代码，需要：

1. 更新导入：`import { http } from '@/api/http'`
2. 添加响应类型：`Promise<ApiResult<YourType>>`
3. 添加错误判断：`if (!res.success) return;`
4. 更新数据访问：`res.data.yourField`

### 实际项目示例

参考 `src/api/project/register/fillProjectInfo.api.ts` 中的完整实现，包括：
- 复杂表单提交
- 文件上传
- 列表查询
- 参数化请求

## 构建验证

运行以下命令验证实现：

```bash
# 类型检查
pnpm typecheck

# 构建验证
pnpm build

# 开发模式测试
pnpm dev
```

## 总结

通过这套 API Result 化方案，我们实现了：
- ✅ 唯一返回包形状：`ApiResult<T>`
- ✅ 统一错误映射和提示
- ✅ 内置重试、取消、超时处理
- ✅ 401/403 等权限统一处理
- ✅ 类型安全和开发体验优化

这确保了前端应用的网络层稳定性和开发效率。
