import Mock from 'mockjs';
import { mockSuccess, mockError, getMockPrefix } from './mock-utils';

const mockPrefix = getMockPrefix();

// 用户相关 Mock 数据
Mock.mock(`${mockPrefix}/user/login`, 'post', (options: any) => {
  try {
    const body = JSON.parse(options.body || '{}');
    
    // 模拟登录验证逻辑
    if (!body.username || !body.password) {
      return mockError('LOGIN_INVALID', '用户名或密码不能为空', 400);
    }
    
    // 模拟错误用户名
    if (body.username === 'error') {
      return mockError('LOGIN_FAILED', '用户名或密码错误', 400);
    }
    
    // 模拟成功登录
    return mockSuccess({
      token: Mock.mock('@guid'),
      userInfo: {
        id: Mock.mock('@id'),
        name: Mock.mock('@cname'),
        email: Mock.mock('@email'),
        role: 'user'
      }
    }, '登录成功');
  } catch (error) {
    return mockError('LOGIN_ERROR', '登录请求处理失败', 500);
  }
});

Mock.mock(`${mockPrefix}/user/logout`, 'post', () => {
  return mockSuccess(null, '退出成功');
});

// 用户列表（用于测试）
Mock.mock(`${mockPrefix}/user/list`, 'get', () => {
  const users = Mock.mock({
    'list|3-8': [{
      'id|+1': 1,
      name: '@cname',
      email: '@email',
      role: '@pick(["admin", "user", "guest"])',
      createTime: '@datetime',
      status: '@pick(["active", "inactive"])'
    }]
  });
  
  return mockSuccess(users.list, '获取用户列表成功');
});

// 用户详情
Mock.mock(new RegExp(`${mockPrefix.replace('/', '\\/')}\\/user\\/\\d+`), 'get', (options: any) => {
  const id = options.url.match(new RegExp(`${mockPrefix.replace('/', '\\/')}\\/user\\/(\\d+)`))?.[1];
  
  if (!id) {
    return mockError('USER_NOT_FOUND', '用户不存在', 404);
  }
  
  return mockSuccess({
    id: parseInt(id),
    name: Mock.mock('@cname'),
    email: Mock.mock('@email'),
    role: Mock.mock('@pick(["admin", "user", "guest"])'),
    avatar: Mock.mock('@image(100x100)'),
    createTime: Mock.mock('@datetime'),
    status: 'active'
  }, '获取用户详情成功');
});
