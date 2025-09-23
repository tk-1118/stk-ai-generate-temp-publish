import type { Router } from 'vue-router';
import { getToken } from '@/auth/token';

export function useSetupGuards(router: Router) {
  // 前置守卫：权限检查
  router.beforeEach((to, from, next) => {
    // 设置页面标题
    if (to.meta?.title) {
      document.title = `${to.meta.title} - Product Foo`;
    }
    
    // 权限检查
    if (to.meta?.auth && !getToken()) {
      console.warn('未授权访问，跳转到首页');
      next('/home');
      return;
    }
    
    next();
  });
}
