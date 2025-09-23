export interface ApiResult<T> {
  code: number;                 // 200=成功；其他按后端约定
  success: boolean;             // true/false
  data: T;                      // 失败时一般为空对象/空数组/null
  msg?: string;                 // 提示文案
  errorCode?: string;           // 细分错误码（如 BIZ_10001、AUTH_401）
}

export function ok<T>(data: T, msg = '操作成功'): ApiResult<T> {
  return { code: 200, success: true, data, msg, errorCode: '' };
}

export function fail<T = never>(errorCode = 'UNKNOWN', msg = '请求失败', code = -1, data?: T): ApiResult<T> {
  return { code, success: false, data: (data as T) ?? (null as any), msg, errorCode };
}

export function isOk<T>(r: ApiResult<T>): r is ApiResult<T> & { success: true } {
  return r.success === true && r.code === 200;
}

/** 用于组合式/列表页：一行拿到 data；失败抛错（让 useQuery 捕获并统一提示） */
export function pickData<T>(r: ApiResult<T>): T {
  if (isOk(r)) return r.data;
  const err = new ApiError(r.msg || '请求失败', r.code, r.errorCode);
  throw err;
}

export class ApiError extends Error {
  code?: number;
  errorCode?: string;
  
  constructor(message: string, code?: number, errorCode?: string) {
    super(message);
    this.code = code;
    this.errorCode = errorCode;
  }
}
