import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getToken, removeToken } from '@/auth/token';

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<any>(null);
  const isLoggedIn = ref(false);
  const permissions = ref<string[]>([]);

  function setUserInfo(info: any) {
    userInfo.value = info;
    isLoggedIn.value = true;
    // 设置用户权限，如果没有提供则使用默认权限
    permissions.value = info.permissions || [];
  }

  function setPermissions(perms: string[]) {
    permissions.value = perms;
  }

  function logout() {
    userInfo.value = null;
    isLoggedIn.value = false;
    permissions.value = [];
    removeToken();
  }

  function checkAuth() {
    const token = getToken();
    isLoggedIn.value = !!token;
    return isLoggedIn.value;
  }

  return {
    userInfo,
    isLoggedIn,
    permissions,
    setUserInfo,
    setPermissions,
    logout,
    checkAuth
  };
});
