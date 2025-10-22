<template>
  <div class="layout-container">
    <!-- 左侧导航菜单 -->
    <aside class="layout-sidebar" :class="{ collapsed: sidebarCollapsed }">
      <div class="sidebar-header">
        <div class="logo">
          <img src="/favicon.svg" alt="Logo" class="logo-icon" />
          <span v-if="!sidebarCollapsed" class="logo-text">示例产品</span>
        </div>
        <button 
          class="collapse-btn" 
          @click="toggleSidebar"
          :title="sidebarCollapsed ? '展开菜单' : '收起菜单'"
        >
          <el-icon>
            <component :is="sidebarCollapsed ? 'Expand' : 'Fold'" />
          </el-icon>
        </button>
      </div>
      
      <nav class="sidebar-nav">
        <el-menu
          :default-active="activeMenuKey"
          :open="openMenuKeys"
          :collapse="sidebarCollapsed"
          :collapse-transition="false"
          mode="vertical"
          router
          class="sidebar-menu"
          @open="handleMenuOpen"
          @close="handleMenuClose"
        >
          <template v-for="item in filteredMenuItems" :key="item.key">
            <MenuItemRenderer :item="item" :collapsed="sidebarCollapsed" />
          </template>
        </el-menu>
      </nav>
    </aside>

    <!-- 右侧主要内容区域 -->
    <div class="layout-main">
      <!-- 顶部用户信息栏 -->
      <header class="layout-header">
        <div class="header-left">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item 
              v-for="(item, index) in breadcrumbItems" 
              :key="index"
              :to="item.path ? { path: item.path } : undefined"
            >
              {{ item.title }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        
        <div class="header-right">
          <!-- 主题切换 -->
          <el-dropdown trigger="click" @command="handleThemeCommand" class="theme-dropdown">
            <div class="theme-switch">
              <el-icon>
                <Sunny v-if="theme === 'light'" />
                <Moon v-else-if="theme === 'dark'" />
                <Monitor v-else />
              </el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="light" :class="{ active: theme === 'light' }">
                  <el-icon><Sunny /></el-icon>
                  亮色主题
                </el-dropdown-item>
                <el-dropdown-item command="dark" :class="{ active: theme === 'dark' }">
                  <el-icon><Moon /></el-icon>
                  暗色主题
                </el-dropdown-item>
                <el-dropdown-item command="admin" :class="{ active: theme === 'admin' }">
                  <el-icon><Monitor /></el-icon>
                  管理员主题
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

          <!-- 用户信息 -->
          <el-dropdown v-if="!isQiankun" trigger="click" @command="handleUserCommand">
            <div class="user-info">
              <el-avatar :size="32" :src="userInfo?.avatar">
                <el-icon><User /></el-icon>
              </el-avatar>
              <span v-if="userInfo?.name" class="username">{{ userInfo.name }}</span>
              <span v-else class="username">游客</span>
              <el-icon class="dropdown-icon"><ArrowDown /></el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile">
                  <el-icon><User /></el-icon>
                  个人信息
                </el-dropdown-item>
                <el-dropdown-item command="settings">
                  <el-icon><Setting /></el-icon>
                  设置
                </el-dropdown-item>
                <el-dropdown-item divided command="logout" v-if="isLoggedIn">
                  <el-icon><SwitchButton /></el-icon>
                  退出登录
                </el-dropdown-item>
                <el-dropdown-item command="login" v-else>
                  <el-icon><User /></el-icon>
                  登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </header>

      <!-- 页面内容区域 -->
      <main class="layout-content">
        <div class="content-wrapper">
          <router-view v-slot="{ Component, route }">
            <transition name="fade" mode="out-in">
              <keep-alive>
                <component :is="Component" :key="route.path" />
              </keep-alive>
            </transition>
          </router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/store/user';
import { useMenu } from '@/composables/useMenu';
import MenuItemRenderer from '@/components/MenuItemRenderer.vue';
import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper';
import { 
  User, 
  Setting, 
  SwitchButton, 
  ArrowDown,
  // Expand,
  // Fold,
  Sunny,
  Moon,
  Monitor
} from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { useTheme } from 'hehe-theme';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const isQiankun = computed(() => qiankunWindow.__POWERED_BY_QIANKUN__);

// 菜单管理
const {
  menuState,
  filteredMenuItems,
  // activeMenuItem,
  activeMenuKey,
  openMenuKeys,
  toggleCollapsed,
  setOpenKeys,
  buildBreadcrumb
} = useMenu();

// 主题管理
const { theme, switchToLight, switchToDark, switchToAdmin } = useTheme();

// 侧边栏状态
const sidebarCollapsed = computed({
  get: () => menuState.value.collapsed,
  set: (value: boolean) => {
    menuState.value.collapsed = value;
  }
});

// 用户信息
const userInfo = computed(() => userStore.userInfo);
const isLoggedIn = computed(() => userStore.isLoggedIn);

// 动态面包屑导航
const breadcrumbItems = computed(() => {
  return buildBreadcrumb();
});

// 当前页面标题
const currentPageTitle = computed(() => {
  return route.meta?.title as string || '';
});

// 切换侧边栏
const toggleSidebar = () => {
  toggleCollapsed();
};

// 菜单展开/收起处理
const handleMenuOpen = (key: string, keyPath: string[]) => {
  setOpenKeys([...openMenuKeys.value, key]);
};

const handleMenuClose = (key: string, keyPath: string[]) => {
  setOpenKeys(openMenuKeys.value.filter(k => k !== key));
};

// 处理主题切换命令
const handleThemeCommand = (command: string) => {
  switch (command) {
    case 'light':
      switchToLight();
      ElMessage.success('已切换到亮色主题');
      break;
    case 'dark':
      switchToDark();
      ElMessage.success('已切换到暗色主题');
      break;
    case 'admin':
      switchToAdmin();
      ElMessage.success('已切换到管理员主题');
      break;
  }
};

// 处理用户下拉菜单命令
const handleUserCommand = (command: string) => {
  switch (command) {
    case 'profile':
      ElMessage.info('个人信息功能开发中...');
      break;
    case 'settings':
      ElMessage.info('设置功能开发中...');
      break;
    case 'logout':
      userStore.logout();
      ElMessage.success('已退出登录');
      router.push('/home');
      break;
    case 'login':
      ElMessage.info('登录功能开发中...');
      break;
  }
};

// 初始化用户状态
userStore.checkAuth();

// 模拟用户信息（实际项目中应该从API获取）
if (isLoggedIn.value && !userInfo.value) {
  userStore.setUserInfo({
    name: '张三',
    avatar: '',
    email: 'zhangsan@example.com'
  });
}
</script>

<style scoped lang="scss">
.layout-container {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

// 左侧边栏
.layout-sidebar {
  width: 240px;
  background: var(--color-sidebar-bg);
  transition: width 0.3s ease;
  display: flex;
  flex-direction: column;
  
  &.collapsed {
    width: 64px;
  }
}

.sidebar-header {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  border-bottom: 1px solid var(--color-sidebar-border);
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  
  .logo-icon {
    width: 32px;
    height: 32px;
    flex-shrink: 0;
  }
  
  .logo-text {
    color: var(--color-text);
    font-size: 18px;
    font-weight: 600;
    white-space: nowrap;
  }
}

.collapse-btn {
  background: none;
  border: none;
  color: var(--color-text-light);
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: var(--color-sidebar-item-hover);
  }
}

.sidebar-nav {
  flex: 1;
  overflow-y: auto;
  
  :deep(.sidebar-menu) {
    border: none;
    background: transparent;
    
    .el-menu-item {
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
    }
    
    .el-icon {
      color: inherit;
    }
  }
}

// 右侧主要区域
.layout-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

// 顶部头部
.layout-header {
  height: 64px;
  background: var(--color-header-bg);
  border-bottom: 1px solid var(--color-header-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  box-shadow: var(--shadow-header);
}

.header-left {
  :deep(.el-breadcrumb) {
      .el-breadcrumb__item {
        .el-breadcrumb__inner {
          color: var(--color-text-secondary);
          font-weight: normal;
          
          &:hover {
            color: var(--color-primary);
          }
        }
        
        &:last-child {
          .el-breadcrumb__inner {
            color: var(--color-text);
            font-weight: 500;
          }
        }
      }
  }
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;

  .theme-dropdown {
    .theme-switch {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      cursor: pointer;
      border-radius: 6px;
      transition: background-color 0.3s;
      
      &:hover {
        background-color: var(--color-bg-secondary);
      }
      
      .el-icon {
        font-size: 18px;
        color: var(--color-text-secondary);
        transition: color 0.3s;
      }
    }
  }

  :deep(.theme-dropdown .el-dropdown-menu) {
    .el-dropdown-item {
        &.active {
          background-color: var(--color-bg-tertiary);
          color: var(--color-primary);
          
          .el-icon {
            color: var(--color-primary);
          }
        }
    }
  }
  
  .user-info {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    padding: 8px 12px;
    border-radius: 6px;
    transition: background-color 0.3s;
    
    &:hover {
      background-color: var(--color-bg-secondary);
    }
    
    .username {
      font-size: 14px;
      color: var(--color-text);
      font-weight: 500;
    }
    
    .dropdown-icon {
      font-size: 12px;
      color: var(--color-text-placeholder);
      transition: transform 0.3s;
    }
  }
}

// 内容区域
.layout-content {
  flex: 1;
  overflow: hidden;
  background: var(--color-layout-bg);
}

.content-wrapper {
  height: 100%;
  padding: 24px;
  overflow-y: auto;
  
  // 为页面内容添加背景
  > * {
    background: var(--color-content-bg);
    border-radius: 8px;
    box-shadow: var(--shadow-content);
    min-height: calc(100vh - 112px - 48px); // 减去header高度和padding
  }
}

// 页面切换动画
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

// 响应式设计
@media (max-width: 768px) {
  .layout-sidebar {
    position: fixed;
    z-index: 1000;
    height: 100vh;
    
    &:not(.collapsed) {
      width: 240px;
    }
  }
  
  .layout-main {
    margin-left: 64px;
  }
  
  .header-left {
    display: none;
  }
  
  .content-wrapper {
    padding: 16px;
  }
}
</style>
