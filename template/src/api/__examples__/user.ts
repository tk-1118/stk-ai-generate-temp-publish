import { http } from '../http';
import { pickData, type ApiResult } from '../types';

export type UserInfo = { id: number; name: string; email: string };

export const userApi = {
  list(): Promise<ApiResult<UserInfo[]>> { return http.get('/api/user/list'); },
  detail(id: number): Promise<ApiResult<UserInfo>> { return http.get(`/api/user/${id}`); },
};

// 列表页推荐写法（配合 useQuery）
// const { data, loading } = useQuery('user:list', async () => pickData(await userApi.list()));
