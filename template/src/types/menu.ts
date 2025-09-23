import type { Component } from 'vue';

/**
 * 菜单项配置接口
 */
export interface MenuItemConfig {
  /** 菜单唯一标识 */
  key: string;
  /** 菜单标题 */
  title: string;
  /** 路由路径 */
  path: string;
  /** 菜单图标组件 */
  icon?: Component;
  /** 是否隐藏菜单项 */
  hidden?: boolean;
  /** 是否需要认证 */
  requireAuth?: boolean;
  /** 子菜单 */
  children?: MenuItemConfig[];
  /** 菜单排序权重，数字越小排序越靠前 */
  order?: number;
  /** 菜单分组 */
  group?: string;
  /** 是否为外部链接 */
  external?: boolean;
  /** 菜单描述 */
  description?: string;
}

/**
 * 菜单配置类型
 */
export interface MenuConfig {
  /** 菜单项列表 */
  items: MenuItemConfig[];
  /** 菜单分组配置 */
  groups?: {
    [key: string]: {
      title: string;
      order: number;
    };
  };
}

/**
 * 菜单状态接口
 */
export interface MenuState {
  /** 当前激活的菜单项 */
  activeKey: string;
  /** 展开的子菜单键值 */
  openKeys: string[];
  /** 菜单是否收起 */
  collapsed: boolean;
}
