export function mapHttpError(e: any): { code: number; errorCode: string; msg: string } {
  if (e?.code === 'ECONNABORTED') return { code: 408, errorCode: 'NET_TIMEOUT', msg: '请求超时' };
  if (e?.message === 'canceled')   return { code: 499, errorCode: 'NET_CANCELED', msg: '请求已取消' };
  const status = e?.response?.status;
  if (status === 401) return { code: 401, errorCode: 'AUTH_401', msg: '未登录或登录已过期' };
  if (status === 403) return { code: 403, errorCode: 'AUTH_403', msg: '无权限访问' };
  if (status === 429) return { code: 429, errorCode: 'RATE_LIMIT', msg: '请求过于频繁' };
  if (status >= 500)  return { code: status, errorCode: 'SERVER_5XX', msg: '服务器开小差了' };
  if (status >= 400)  return { code: status, errorCode: 'CLIENT_4XX', msg: e?.response?.data?.message || '客户端请求异常' };
  return { code: -1, errorCode: 'NET_UNKNOWN', msg: '网络异常' };
}
