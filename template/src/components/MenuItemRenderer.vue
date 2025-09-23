<template>
  <template v-if="shouldShow">
    <!-- 有子菜单的情况 -->
    <el-sub-menu v-if="item.children && item.children.length > 0" :index="item.key">
      <template #title>
        <el-icon v-if="item.icon && !collapsed">
          <component :is="item.icon" />
        </el-icon>
        <span>{{ item.title }}</span>
      </template>
      
      <template v-for="child in visibleChildren" :key="child.key">
        <MenuItemRenderer :item="child" :collapsed="collapsed" />
      </template>
    </el-sub-menu>
    
    <!-- 普通菜单项 -->
    <el-menu-item 
      v-else 
      :index="getMenuPath(item)"
      @click="handleMenuClick(item)"
    >
      <el-icon v-if="item.icon">
        <component :is="item.icon" />
      </el-icon>
      <template #title>
        <span>{{ item.title }}</span>
        <el-tooltip 
          v-if="item.description && collapsed" 
          :content="item.description" 
          placement="right"
        >
          <el-icon class="menu-info-icon">
            <InfoFilled />
          </el-icon>
        </el-tooltip>
      </template>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/user';
import { InfoFilled } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import type { MenuItemConfig } from '@/types/menu';

interface Props {
  item: MenuItemConfig;
  collapsed?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  collapsed: false
});

const router = useRouter();
const userStore = useUserStore();

// 判断菜单项是否应该显示
const shouldShow = computed(() => {
  // 检查是否隐藏
  if (props.item.hidden) return false;
  
  // 检查权限
  if (props.item.requireAuth && !userStore.isLoggedIn) return false;
  
  return true;
});

// 获取可见的子菜单
const visibleChildren = computed(() => {
  if (!props.item.children) return [];
  
  return props.item.children.filter(child => {
    if (child.hidden) return false;
    if (child.requireAuth && !userStore.isLoggedIn) return false;
    return true;
  });
});

// 获取菜单路径
const getMenuPath = (item: MenuItemConfig) => {
  // 如果是外部链接，返回完整URL
  if (item.external) {
    return item.path;
  }
  
  // 返回路由路径
  return item.path;
};

// 处理菜单点击
const handleMenuClick = (item: MenuItemConfig) => {
  // 如果是外部链接
  if (item.external) {
    window.open(item.path, '_blank');
    return;
  }
  
  // 如果需要权限但用户未登录
  if (item.requireAuth && !userStore.isLoggedIn) {
    ElMessage.warning('请先登录后再访问该页面');
    return;
  }
  
  // 路由跳转
  try {
    router.push(item.path);
  } catch (error) {
    console.error('路由跳转失败:', error);
    ElMessage.error('页面跳转失败');
  }
};
</script>

<style scoped lang="scss">
.menu-info-icon {
  margin-left: 4px;
  font-size: 12px;
  color: var(--color-text-placeholder);
  opacity: 0.6;
  transition: opacity 0.3s;
  
  &:hover {
    opacity: 1;
  }
}

:deep(.el-sub-menu) {
  .el-sub-menu__title {
    color: var(--color-text-sidebar);
    
    &:hover {
      background-color: var(--color-sidebar-item-hover);
      color: var(--color-text-sidebar-active);
    }
    
    .el-icon {
      color: inherit;
    }
  }
  
  &.is-active > .el-sub-menu__title {
    color: var(--color-text-sidebar-active);
  }
}

:deep(.el-menu-item) {
  color: var(--color-text-sidebar);
  
  &:hover {
    background-color: var(--color-sidebar-item-hover);
    color: var(--color-text-sidebar-active);
  }
  
  &.is-active {
    background-color: var(--color-sidebar-item-active);
    color: var(--color-text-sidebar-active);
    
    &::after {
      display: none;
    }
  }
  
  .el-icon {
    color: inherit;
  }
}
</style>
