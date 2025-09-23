import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '@/store/user';
import { menuConfig, getMenuItemByPath, filterMenuByPermissions } from '@/config/menu';
import type { MenuItemConfig, MenuState } from '@/types/menu';

/**
 * 菜单管理组合式函数
 * 提供菜单状态管理、权限控制、激活状态计算等功能
 */
export function useMenu() {
  const route = useRoute();
  const userStore = useUserStore();

  // 菜单状态
  const menuState = ref<MenuState>({
    activeKey: '',
    openKeys: [],
    collapsed: false
  });

  // 根据用户权限过滤后的菜单项
  const filteredMenuItems = computed(() => {
    const userPermissions = userStore.permissions || [];
    return filterMenuByPermissions(menuConfig.items, userPermissions);
  });

  // 当前激活的菜单项
  const activeMenuItem = computed(() => {
    const currentPath = route.path;
    return getMenuItemByPath(currentPath);
  });

  // 计算当前激活的菜单键值
  const activeMenuKey = computed(() => {
    const currentPath = route.path;
    
    // 处理详情页面的特殊情况
    if (currentPath.startsWith('/detail/')) {
      return 'detail';
    }
    
    // 查找匹配的菜单项
    const menuItem = getMenuItemByPath(currentPath);
    return menuItem?.key || '';
  });

  // 计算需要展开的菜单键值
  const openMenuKeys = computed(() => {
    const keys: string[] = [];
    const currentPath = route.path;
    
    // 递归查找父级菜单
    const findParentKeys = (items: MenuItemConfig[], targetPath: string, parentKeys: string[] = []): string[] => {
      for (const item of items) {
        const currentKeys = [...parentKeys, item.key];
        
        if (item.path === targetPath || 
            (item.key === 'detail' && targetPath.startsWith('/detail/')) ||
            (targetPath.startsWith(item.path) && item.path !== '/')) {
          return currentKeys.slice(0, -1); // 返回父级键值，不包括当前项
        }
        
        if (item.children) {
          const found = findParentKeys(item.children, targetPath, currentKeys);
          if (found.length > 0) {
            return found;
          }
        }
      }
      return [];
    };
    
    return findParentKeys(filteredMenuItems.value, currentPath);
  });

  // 监听路由变化，更新菜单状态
  watch(
    () => route.path,
    (newPath) => {
      menuState.value.activeKey = activeMenuKey.value;
      menuState.value.openKeys = openMenuKeys.value;
    },
    { immediate: true }
  );

  // 切换侧边栏收起状态
  const toggleCollapsed = () => {
    menuState.value.collapsed = !menuState.value.collapsed;
  };

  // 设置菜单展开状态
  const setOpenKeys = (keys: string[]) => {
    menuState.value.openKeys = keys;
  };

  // 判断菜单项是否应该显示
  const shouldShowMenuItem = (item: MenuItemConfig): boolean => {
    // 检查是否隐藏
    if (item.hidden) return false;
    
    // 检查权限
    if (item.requireAuth && !userStore.isLoggedIn) return false;
    
    return true;
  };

  // 获取菜单项的显示路径（用于路由跳转）
  const getMenuItemPath = (item: MenuItemConfig): string => {
    // 如果是外部链接，直接返回
    if (item.external) return item.path;
    
    // 处理动态路由的默认路径
    return item.path;
  };

  // 构建面包屑导航
  const buildBreadcrumb = () => {
    const breadcrumbs: Array<{ title: string; path?: string }> = [];
    const currentPath = route.path;
    
    // 递归查找路径层级
    const findPathHierarchy = (items: MenuItemConfig[], targetPath: string, hierarchy: MenuItemConfig[] = []): MenuItemConfig[] => {
      for (const item of items) {
        const currentHierarchy = [...hierarchy, item];
        
        if (item.path === targetPath || 
            (item.key === 'detail' && targetPath.startsWith('/detail/')) ||
            (targetPath.startsWith(item.path) && item.path !== '/')) {
          return currentHierarchy;
        }
        
        if (item.children) {
          const found = findPathHierarchy(item.children, targetPath, currentHierarchy);
          if (found.length > 0) {
            return found;
          }
        }
      }
      return [];
    };
    
    const hierarchy = findPathHierarchy(filteredMenuItems.value, currentPath);
    
    // 添加首页
    breadcrumbs.push({ title: '首页', path: '/home' });
    
    // 添加层级路径
    hierarchy.forEach((item, index) => {
      if (item.key !== 'home') { // 避免重复添加首页
        breadcrumbs.push({
          title: item.title,
          path: index === hierarchy.length - 1 ? undefined : item.path // 最后一级不需要链接
        });
      }
    });
    
    return breadcrumbs;
  };

  return {
    // 状态
    menuState,
    filteredMenuItems,
    activeMenuItem,
    activeMenuKey,
    openMenuKeys,
    
    // 方法
    toggleCollapsed,
    setOpenKeys,
    shouldShowMenuItem,
    getMenuItemPath,
    buildBreadcrumb
  };
}
