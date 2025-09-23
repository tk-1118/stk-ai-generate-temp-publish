import { type ApiResult } from '@/api/types';

/**
 * 获取 Mock 数据的路径前缀
 * 如果启用了代理，Mock 使用 /mock 前缀避免冲突
 * 否则使用 /api 前缀
 */
export function getMockPrefix(): string {
  const useProxy = import.meta.env.VITE_USE_PROXY === 'true';
  return useProxy ? '/mock' : '/api';
}

/**
 * Mock 成功响应工具函数
 * @param data 响应数据
 * @param msg 提示信息
 * @returns 标准 ApiResult 格式
 */
export function mockSuccess<T>(data: T, msg = '操作成功'): ApiResult<T> {
  return {
    code: 200,
    success: true,
    data,
    msg,
    errorCode: ''
  };
}

/**
 * Mock 失败响应工具函数
 * @param errorCode 错误码
 * @param msg 错误信息
 * @param code HTTP 状态码
 * @returns 标准 ApiResult 格式
 */
export function mockError<T = never>(
  errorCode = 'MOCK_ERROR',
  msg = 'Mock 错误',
  code = 400
): ApiResult<T> {
  return {
    code,
    success: false,
    data: null as any,
    msg,
    errorCode
  };
}

/**
 * Mock 权限错误
 */
export function mockAuthError(): ApiResult<never> {
  return mockError('AUTH_401', '未登录或登录已过期', 401);
}

/**
 * Mock 无权限错误
 */
export function mockForbiddenError(): ApiResult<never> {
  return mockError('AUTH_403', '无权限访问', 403);
}

/**
 * Mock 服务器错误
 */
export function mockServerError(): ApiResult<never> {
  return mockError('SERVER_5XX', '服务器开小差了', 500);
}
