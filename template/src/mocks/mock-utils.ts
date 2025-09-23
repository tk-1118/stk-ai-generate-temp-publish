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
 * 记录 Mock 请求日志，模拟 Network 面板效果
 * @param options Mock 请求选项
 * @param response 响应数据
 */
export function logMockRequest(options: any, response: any) {
  const method = (options.type || 'GET').toUpperCase();
  const url = options.url;
  const timestamp = new Date().toLocaleTimeString();
  
  // 解析请求体
  let requestBody = null;
  try {
    if (options.body) {
      requestBody = typeof options.body === 'string' ? JSON.parse(options.body) : options.body;
    }
  } catch (e) {
    requestBody = options.body;
  }

  // 控制台样式
  const styles = {
    method: method === 'GET' ? 'color: #0066cc; font-weight: bold;' : 
            method === 'POST' ? 'color: #ff6600; font-weight: bold;' :
            method === 'PUT' ? 'color: #cc9900; font-weight: bold;' :
            method === 'DELETE' ? 'color: #cc0000; font-weight: bold;' :
            'color: #666666; font-weight: bold;',
    url: 'color: #0066cc;',
    status: response.code >= 200 && response.code < 300 ? 'color: #009900; font-weight: bold;' : 'color: #cc0000; font-weight: bold;',
    time: 'color: #666666; font-size: 12px;'
  };

  console.group(`%c[MOCK REQUEST] %c${method} %c${url}`, 
    'color: #ff6600; font-weight: bold; background: #fff3e0; padding: 2px 6px; border-radius: 3px;',
    styles.method,
    styles.url
  );
  
  console.log(`%c⏰ Time: ${timestamp}`, styles.time);
  console.log(`%c📊 Status: ${response.code} ${getStatusText(response.code)}`, styles.status);
  
  if (requestBody) {
    console.log('📤 Request Body:', requestBody);
  }
  
  if (options.headers) {
    console.log('📋 Request Headers:', options.headers);
  }
  
  console.log('📥 Response:', response);
  
  // 模拟 Network 时间
  const mockDuration = Math.floor(Math.random() * 400) + 100; // 100-500ms
  console.log(`%c⚡ Duration: ${mockDuration}ms (mocked)`, 'color: #666666; font-size: 12px;');
  
  console.groupEnd();
  
  // 在 Network 样式的表格中显示请求概要
  console.log(
    `%c${method.padEnd(6)} %c${response.code.toString().padEnd(4)} %c${url} %c${mockDuration}ms`,
    styles.method,
    styles.status,
    styles.url,
    'color: #666666;'
  );
}

/**
 * 获取状态码对应的状态文本
 */
function getStatusText(code: number): string {
  const statusMap: Record<number, string> = {
    200: 'OK',
    201: 'Created',
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    500: 'Internal Server Error',
  };
  return statusMap[code] || 'Unknown';
}

/**
 * Mock 成功响应工具函数（带日志）
 * @param data 响应数据
 * @param msg 提示信息
 * @param options Mock 请求选项（用于日志记录）
 * @returns 标准 ApiResult 格式
 */
export function mockSuccess<T>(data: T, msg = '操作成功', options?: any): ApiResult<T> {
  const response = {
    code: 200,
    success: true,
    data,
    msg,
    errorCode: ''
  };
  
  // 记录请求日志
  if (options) {
    logMockRequest(options, response);
  }
  
  return response;
}

/**
 * Mock 失败响应工具函数（带日志）
 * @param errorCode 错误码
 * @param msg 错误信息
 * @param code HTTP 状态码
 * @param options Mock 请求选项（用于日志记录）
 * @returns 标准 ApiResult 格式
 */
export function mockError<T = never>(
  errorCode = 'MOCK_ERROR',
  msg = 'Mock 错误',
  code = 400,
  options?: any
): ApiResult<T> {
  const response = {
    code,
    success: false,
    data: null as any,
    msg,
    errorCode
  };
  
  // 记录请求日志
  if (options) {
    logMockRequest(options, response);
  }
  
  return response;
}

/**
 * Mock 权限错误
 */
export function mockAuthError(options?: any): ApiResult<never> {
  return mockError('AUTH_401', '未登录或登录已过期', 401, options);
}

/**
 * Mock 无权限错误
 */
export function mockForbiddenError(options?: any): ApiResult<never> {
  return mockError('AUTH_403', '无权限访问', 403, options);
}

/**
 * Mock 服务器错误
 */
export function mockServerError(options?: any): ApiResult<never> {
  return mockError('SERVER_5XX', '服务器开小差了', 500, options);
}
