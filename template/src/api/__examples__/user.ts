import { http } from '../http';
import { pickData, type ApiResult } from '../types';

export type UserInfo = { id: number; name: string; email: string };

// 注意：在实际使用中，Mock 文件会根据环境变量自动调整路径前缀
// 这里的路径会自动添加 baseURL 前缀
export const userApi = {
  list(): Promise<ApiResult<UserInfo[]>> { return http.get('/user/list'); },
  detail(id: number): Promise<ApiResult<UserInfo>> { return http.get(`/user/${id}`); },
};

// 列表页推荐写法（配合 useQuery）
// const { data, loading } = useQuery('user:list', async () => pickData(await userApi.list()));
