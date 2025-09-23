import Mock from 'mockjs';
import { mockSuccess, mockError, mockAuthError, mockServerError } from './mock-utils';
import './project/register/fillProjectInfo.mock';
import './project/registration/list.mock';
import './project/detail.mock';

export function setupMock() {
  console.log('[Mock] 启用 Mock 数据');
  
  // 根据环境变量决定 Mock 数据的路径前缀
  // 如果启用了代理，Mock 使用 /mock 前缀避免冲突
  const useProxy = import.meta.env.VITE_USE_PROXY === 'true';
  const mockPrefix = useProxy ? '/mock' : '/api';
  
  console.log(`[Mock] 使用路径前缀: ${mockPrefix}${useProxy ? ' (代理模式)' : ' (纯Mock模式)'}`);
  
  // 用户信息
  Mock.mock(`${mockPrefix}/user/info`, 'get', () => {
    return mockSuccess({
      id: Mock.mock('@id'),
      name: Mock.mock('@cname'),
      email: Mock.mock('@email'),
      avatar: Mock.mock('@image(100x100)'),
      role: 'user'
    }, '获取用户信息成功');
  });

  // 产品详情
  Mock.mock(new RegExp(`${mockPrefix.replace('/', '\\/')}\\/detail\\/\\d+`), 'get', () => {
    return mockSuccess({
      id: Mock.mock('@id'),
      title: Mock.mock('@ctitle(5,10)'),
      content: Mock.mock('@cparagraph(3,7)'),
      createTime: Mock.mock('@datetime'),
      author: Mock.mock('@cname')
    }, '获取详情成功');
  });

  // Foo 列表数据
  Mock.mock('/foo/list', 'get', () => {
    const list = Mock.mock({
      'list|5-10': [{
        'id|+1': 1,
        title: '@ctitle(4,8)',
        date: '@datetime("yyyy-MM-dd HH:mm:ss")'
      }]
    });
    
    return mockSuccess({
      list: list.list
    }, '获取列表成功');
  });

  // 模拟错误场景
  Mock.mock(`${mockPrefix}/error/auth`, 'get', () => {
    return mockAuthError();
  });

  Mock.mock(`${mockPrefix}/error/server`, 'get', () => {
    return mockServerError();
  });

  Mock.mock(`${mockPrefix}/error/business`, 'get', () => {
    return mockError('BIZ_10001', '业务逻辑错误', 400);
  });
  
  // 延迟响应
  Mock.setup({
    timeout: '200-600'
  });
}