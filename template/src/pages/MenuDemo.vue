<template>
  <div class="menu-demo-page">
    <div class="page-header">
      <h1>动态菜单系统演示</h1>
      <p>展示动态菜单的功能特性和使用方法</p>
    </div>
    
    <MenuDemo />
    
    <div class="feature-showcase">
      <el-row :gutter="24">
        <el-col :span="8">
          <el-card header="🚀 主要特性">
            <ul class="feature-list">
              <li>✅ 基于路由配置自动生成菜单</li>
              <li>✅ 支持多层级嵌套菜单</li>
              <li>✅ 权限控制和动态隐藏</li>
              <li>✅ 图标和样式自定义</li>
              <li>✅ 响应式设计支持</li>
              <li>✅ 面包屑导航自动生成</li>
            </ul>
          </el-card>
        </el-col>
        
        <el-col :span="8">
          <el-card header="🛠️ 技术实现">
            <ul class="feature-list">
              <li>🔧 Vue 3 Composition API</li>
              <li>🔧 TypeScript 类型安全</li>
              <li>🔧 Element Plus UI 组件</li>
              <li>🔧 Vue Router 路由管理</li>
              <li>🔧 Pinia 状态管理</li>
              <li>🔧 递归组件渲染</li>
            </ul>
          </el-card>
        </el-col>
        
        <el-col :span="8">
          <el-card header="📁 文件结构">
            <div class="file-structure">
              <pre><code>src/
├── types/menu.ts          # 菜单类型定义
├── config/menu.ts         # 菜单配置文件
├── composables/useMenu.ts # 菜单逻辑组合函数
├── components/
│   └── MenuItemRenderer.vue # 菜单项渲染组件
└── layouts/Layout.vue     # 布局组件</code></pre>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    
    <div class="usage-guide">
      <el-card header="📖 使用指南">
        <el-steps :active="3" align-center>
          <el-step title="配置菜单" description="在 config/menu.ts 中配置菜单项" />
          <el-step title="设置路由" description="确保路由配置与菜单路径匹配" />
          <el-step title="权限控制" description="通过用户权限控制菜单显示" />
          <el-step title="自动生成" description="系统自动生成动态菜单" />
        </el-steps>
        
        <div class="code-example">
          <h4>配置示例：</h4>
          <el-code-block>
            <pre><code>// config/menu.ts
export const menuConfig = {
  items: [
    {
      key: 'home',
      title: '首页',
      path: '/home',
      icon: House,
      order: 1
    },
    {
      key: 'project',
      title: '项目管理',
      path: '/project',
      icon: FolderOpened,
      children: [
        {
          key: 'project-list',
          title: '项目列表',
          path: '/project/list',
          requireAuth: true
        }
      ]
    }
  ]
};</code></pre>
          </el-code-block>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import MenuDemo from '@/components/MenuDemo.vue';
</script>

<style scoped lang="scss">
.menu-demo-page {
  padding: 24px;
}

.page-header {
  text-align: center;
  margin-bottom: 32px;
  
  h1 {
    font-size: 28px;
    color: var(--color-text);
    margin-bottom: 8px;
  }
  
  p {
    font-size: 16px;
    color: var(--color-text-secondary);
  }
}

.feature-showcase {
  margin: 32px 0;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
  
  li {
    padding: 8px 0;
    color: var(--color-text);
    border-bottom: 1px solid var(--color-border-light);
    
    &:last-child {
      border-bottom: none;
    }
  }
}

.file-structure {
  pre {
    background: var(--color-bg-secondary);
    padding: 16px;
    border-radius: 6px;
    font-size: 12px;
    line-height: 1.5;
    overflow-x: auto;
    
    code {
      color: var(--color-text);
      font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
    }
  }
}

.usage-guide {
  margin-top: 32px;
}

.code-example {
  margin-top: 24px;
  
  h4 {
    color: var(--color-text);
    margin-bottom: 12px;
  }
  
  pre {
    background: var(--color-bg-secondary);
    padding: 20px;
    border-radius: 8px;
    border-left: 4px solid var(--color-primary);
    overflow-x: auto;
    
    code {
      color: var(--color-text);
      font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
      font-size: 14px;
      line-height: 1.6;
    }
  }
}

:deep(.el-steps) {
  margin: 32px 0;
}

:deep(.el-card) {
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-content);
  
  .el-card__header {
    background: var(--color-bg-secondary);
    border-bottom: 1px solid var(--color-border);
  }
}
</style>
