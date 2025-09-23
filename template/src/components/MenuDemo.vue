<template>
  <div class="menu-demo">
    <el-card header="动态菜单演示">
      <div class="demo-section">
        <h4>当前菜单状态</h4>
        <el-descriptions :column="2" border>
          <el-descriptions-item label="当前激活菜单">
            {{ activeMenuKey || '无' }}
          </el-descriptions-item>
          <el-descriptions-item label="展开的菜单">
            {{ openMenuKeys.join(', ') || '无' }}
          </el-descriptions-item>
          <el-descriptions-item label="侧边栏状态">
            {{ menuState.collapsed ? '收起' : '展开' }}
          </el-descriptions-item>
          <el-descriptions-item label="用户登录状态">
            {{ userStore.isLoggedIn ? '已登录' : '未登录' }}
          </el-descriptions-item>
        </el-descriptions>
      </div>

      <div class="demo-section">
        <h4>菜单操作</h4>
        <el-space wrap>
          <el-button @click="toggleCollapsed" type="primary">
            {{ menuState.collapsed ? '展开' : '收起' }}侧边栏
          </el-button>
          <el-button @click="simulateLogin" :type="userStore.isLoggedIn ? 'danger' : 'success'">
            {{ userStore.isLoggedIn ? '退出登录' : '模拟登录' }}
          </el-button>
          <el-button @click="addDynamicMenu" type="warning">
            添加动态菜单
          </el-button>
          <el-button @click="showMenuStructure" type="info">
            查看菜单结构
          </el-button>
        </el-space>
      </div>

      <div class="demo-section" v-if="showStructure">
        <h4>菜单结构</h4>
        <el-tree
          :data="menuTreeData"
          :props="{ children: 'children', label: 'title' }"
          default-expand-all
          class="menu-tree"
        >
          <template #default="{ node, data }">
            <span class="tree-node">
              <el-icon v-if="data.icon" class="tree-icon">
                <component :is="data.icon" />
              </el-icon>
              <span>{{ data.title }}</span>
              <el-tag v-if="data.requireAuth" size="small" type="warning">需认证</el-tag>
              <el-tag v-if="data.hidden" size="small" type="info">隐藏</el-tag>
              <span class="tree-path">{{ data.path }}</span>
            </span>
          </template>
        </el-tree>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus';
import { useMenu } from '@/composables/useMenu';
import { useUserStore } from '@/store/user';
import { menuConfig } from '@/config/menu';

const {
  menuState,
  filteredMenuItems,
  activeMenuKey,
  openMenuKeys,
  toggleCollapsed
} = useMenu();

const userStore = useUserStore();
const showStructure = ref(false);

// 菜单树数据
const menuTreeData = computed(() => {
  return filteredMenuItems.value;
});

// 模拟登录/退出
const simulateLogin = () => {
  if (userStore.isLoggedIn) {
    userStore.logout();
    ElMessage.success('已退出登录');
  } else {
    userStore.setUserInfo({
      name: '测试用户',
      avatar: '',
      email: 'test@example.com',
      permissions: ['read', 'write', 'admin']
    });
    ElMessage.success('登录成功');
  }
};

// 添加动态菜单（演示用）
const addDynamicMenu = () => {
  ElMessage.info('动态菜单功能演示：在实际应用中，可以通过API动态加载菜单配置');
};

// 显示菜单结构
const showMenuStructure = () => {
  showStructure.value = !showStructure.value;
};
</script>

<style scoped lang="scss">
.menu-demo {
  padding: 20px;
}

.demo-section {
  margin-bottom: 24px;
  
  h4 {
    margin-bottom: 16px;
    color: var(--color-text);
    font-weight: 600;
  }
}

.menu-tree {
  background: var(--color-bg-secondary);
  border-radius: 6px;
  padding: 12px;
  
  :deep(.el-tree-node__content) {
    padding: 8px;
    border-radius: 4px;
    
    &:hover {
      background-color: var(--color-bg-tertiary);
    }
  }
}

.tree-node {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  
  .tree-icon {
    font-size: 16px;
    color: var(--color-primary);
  }
  
  .tree-path {
    margin-left: auto;
    font-size: 12px;
    color: var(--color-text-placeholder);
    font-family: monospace;
  }
}
</style>
