import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';
import { ok, fail, type ApiResult } from './types';
import { mapHttpError } from './error-map';
import { ElMessage } from 'element-plus';

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  timeout: 15000,
  withCredentials: true,
});

instance.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token');
  if (token) {
    cfg.headers = cfg.headers || {} as any;
    cfg.headers['Authorization'] = `Bearer ${token}`;
  }
  return cfg;
});

/** 直接把后端 JSON 体交给调用层 */
instance.interceptors.response.use(resp => resp.data, e => Promise.reject(e));

type Ext = { retry?: number; retryDelayMs?: number; silent?: boolean };

async function request<T>(cfg: AxiosRequestConfig & Ext): Promise<ApiResult<T>> {
  const { retry = 0, retryDelayMs = 600, silent = false, ...rest } = cfg;
  let attempt = 0;
  for (;;) {
    try {
      const data: any = await instance.request<any>(rest as any);
      // 若后端已返回 {code,success,data,msg,errorCode} 则透传
      if (typeof data?.success === 'boolean' && 'code' in data && 'data' in data) {
        if (!data.success && !silent) ElMessage.error(data.msg || '操作失败');
        return data as ApiResult<T>;
      }
      // 兼容裸 data
      return ok<T>(data as T);
    } catch (e: any) {
      const m = mapHttpError(e);
      if (!silent) ElMessage.error(m.msg);
      if (attempt < retry) {
        await new Promise(r => setTimeout(r, retryDelayMs * (attempt + 1)));
        attempt++;
        continue;
      }
      return fail<T>(m.errorCode, m.msg, m.code);
    }
  }
}

export const http = {
  get<T>(url: string, params?: any, cfg?: AxiosRequestConfig & Ext) {
    return request<T>({ url, method: 'GET', params, ...cfg });
  },
  post<T>(url: string, data?: any, cfg?: AxiosRequestConfig & Ext) {
    return request<T>({ url, method: 'POST', data, ...cfg });
  },
  put<T>(url: string, data?: any, cfg?: AxiosRequestConfig & Ext) {
    return request<T>({ url, method: 'PUT', data, ...cfg });
  },
  del<T>(url: string, cfg?: AxiosRequestConfig & Ext) {
    return request<T>({ url, method: 'DELETE', ...cfg });
  },
};