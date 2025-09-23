import { getToken } from './token';

export function hasPermission(permission: string): boolean {
  const token = getToken();
  if (!token) return false;
  
  // 这里可以根据 token 解析权限
  // 目前简单实现：有 token 就有权限
  return true;
}

export function requireAuth(): boolean {
  return isAuthenticated();
}

export function isAuthenticated(): boolean {
  return !!getToken();
}
