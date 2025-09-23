import { http } from './http';
import { type ApiResult } from './types';

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface LoginParams {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  userInfo: UserInfo;
}

// 用户登录
export function login(params: LoginParams): Promise<ApiResult<LoginResponse>> {
  return http.post<LoginResponse>('/user/login', params);
}

// 获取用户信息
export function getUserInfo(): Promise<ApiResult<UserInfo>> {
  return http.get<UserInfo>('/user/info');
}

// 用户登出
export function logout(): Promise<ApiResult<void>> {
  return http.post<void>('/user/logout');
}
