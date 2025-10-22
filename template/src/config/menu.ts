import { 
  House, 
  Document, 
  Connection, 
  Setting,
  Files,
} from '@element-plus/icons-vue';
import type { MenuConfig } from '@/types/menu';

/**
 * 菜单配置
 * 这里配置所有菜单项，包括图标、标题、路径等
 */
export const menuConfig: MenuConfig = {
  items: [
    {
      key: 'home',
      title: '首页',
      path: '/home',
      icon: House,
      order: 1,
      description: '系统首页，展示概览信息'
    },
    {
      key: 'introduction',
      title: '产品介绍',
      path: '/introduction',
      icon: Document,
      order: 2,
      description: '产品介绍页面'
    },
    {
      key: 'api-test',
      title: 'API 测试',
      path: '/api-test',
      icon: Connection,
      order: 3,
      description: 'API接口测试工具'
    },
    {
      key: 'menu-demo',
      title: '菜单演示',
      path: '/menu-demo',
      icon: Setting,
      order: 3.5,
      description: '动态菜单系统演示页面'
    },
    {
      key: 'project-registration',
      title: '项目登记',
      path: '/project/registration',
      icon: Files,
      children: [
        {
          key: 'project-registration-list',
          title: '项目登记列表',
          path: '/project/registration/list',
          icon: Document,
          description: '查看和管理项目登记信息'
        },
      ]
    }
  ],
  groups: {
    management: {
      title: '管理中心',
      order: 2
    },
    system: {
      title: '系统设置',
      order: 3
    }
  }
};

/**
 * 根据路径获取菜单配置
 * @param path 路由路径
 * @returns 匹配的菜单项配置
 */
export function getMenuItemByPath(path: string) {
  const findMenuItem = (items: typeof menuConfig.items, targetPath: string): any => {
    for (const item of items) {
      // 处理动态路由匹配
      if (item.path === targetPath) {
        return item;
      }

      
      // 处理路径前缀匹配
      if (targetPath.startsWith(item.path) && item.path !== '/') {
        return item;
      }
      
      // 递归查找子菜单
      if (item.children) {
        const found = findMenuItem(item.children, targetPath);
        if (found) return found;
      }
    }
    return null;
  };
  
  return findMenuItem(menuConfig.items, path);
}

/**
 * 获取扁平化的菜单项列表（包含所有层级）
 * @param items 菜单项数组
 * @returns 扁平化的菜单项数组
 */
export function getFlatMenuItems(items = menuConfig.items): any[] {
  const result: any[] = [];
  
  const flatten = (menuItems: any[]) => {
    menuItems.forEach(item => {
      result.push(item);
      if (item.children) {
        flatten(item.children);
      }
    });
  };
  
  flatten(items);
  return result;
}

/**
 * 根据用户权限过滤菜单项
 * @param items 菜单项数组
 * @param userPermissions 用户权限列表
 * @returns 过滤后的菜单项数组
 */
export function filterMenuByPermissions(
  items: typeof menuConfig.items, 
  userPermissions: string[] = []
): typeof menuConfig.items {
  return items
    .filter(item => {
      // 如果菜单项需要认证但用户未登录，则隐藏
      if (item.requireAuth && userPermissions.length === 0) {
        return false;
      }
      
      // 如果明确设置为隐藏，则不显示
      if (item.hidden) {
        return false;
      }
      
      return true;
    })
    .map(item => ({
      ...item,
      children: item.children ? filterMenuByPermissions(item.children, userPermissions) : undefined
    }))
    .sort((a, b) => (a.order || 999) - (b.order || 999));
}
