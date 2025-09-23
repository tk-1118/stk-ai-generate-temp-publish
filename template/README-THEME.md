/* 后台管理系统主题 - 以 #eff7ff 为背景色 */

/* 管理系统主题变量 */
:root[data-theme="admin"] {
  /* 主色系 - 保持与 UI 库一致 */
  --color-primary: #3461ff;
  --color-primary-light: #6686ff;
  --color-primary-dark: #2b4ed1;
  
  /* 背景色系 - 以 #eff7ff 为主 */
  --color-bg: #eff7ff;
  --color-bg-secondary: #e6f0ff;
  --color-bg-tertiary: #dde9ff;
  --color-bg-quaternary: #d4e2ff;
  
  /* 布局专用背景色 */
  --color-layout-bg: #eff7ff;
  --color-sidebar-bg: #eff7ff;
  --color-sidebar-item-hover: #f0f7ff;
  --color-sidebar-item-active: #e6f0ff;
  --color-header-bg: #eff7ff;
  --color-content-bg: #eff7ff;
  
  /* 顶部导航 */
  --color-header-border: #e6f0ff;
  
  /* 内容区域 */
  --color-content-bg: #ffffff;
  --color-content-border: #e6f0ff;
  
  /* 卡片 */
  --color-card-bg: #ffffff;
  --color-card-border: #e6f0ff;
  --color-card-shadow: 0 2px 8px rgba(52, 97, 255, 0.08);
  
  /* 文字色 */
  --color-text: #1a1a1a;
  --color-text-secondary: #666666;
  --color-text-tertiary: #999999;
  --color-text-quaternary: #cccccc;
  --color-text-light: #ffffff;
  --color-text-sidebar: #1a1a1a;
  --color-text-sidebar-active: #3461ff;
  
  /* 边框色 */
  --color-border: #e6f0ff;
  --color-border-light: #f0f7ff;
  --color-border-lighter: #f0f7ff;
  --color-border-extra-light: #f7fbff;
  --color-border-dark: #dde9ff;
  --color-sidebar-border: #e6f0ff;
  --color-header-border: #e6f0ff;
  
  /* 状态色 */
  --color-success: #52c41a;
  --color-warning: #faad14;
  --color-danger: #ff4d4f;
  --color-info: #1890ff;
  
  /* 阴影 */
  --shadow-base: 0 2px 8px rgba(52, 97, 255, 0.08);
  --shadow-light: 0 1px 4px rgba(52, 97, 255, 0.06);
  --shadow-dark: 0 4px 16px rgba(52, 97, 255, 0.12);
  --shadow-header: 0 2px 8px rgba(52, 97, 255, 0.06);
  --shadow-content: 0 2px 8px rgba(52, 97, 255, 0.08);
  
  /* 圆角 */
  --border-radius-small: 4px;
  --border-radius-base: 6px;
  --border-radius-large: 8px;
  --border-radius-round: 50%;
  
  /* 间距 */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
}

/* 管理系统布局样式 */
.admin-layout {
  background-color: var(--color-bg);
  min-height: 100vh;
  transition: background-color 0.3s ease;
}

.admin-header {
  background-color: var(--color-header-bg);
  border-bottom: 1px solid var(--color-header-border);
  box-shadow: var(--shadow-light);
  padding: 0 var(--spacing-lg);
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.admin-sidebar {
  background-color: var(--color-sidebar-bg);
  border-right: 1px solid var(--color-border);
  box-shadow: var(--shadow-light);
  width: 240px;
  min-height: calc(100vh - 64px);
  padding: var(--spacing-md);
}

.admin-sidebar-item {
  padding: var(--spacing-sm) var(--spacing-md);
  margin-bottom: var(--spacing-xs);
  border-radius: var(--border-radius-base);
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--color-text);
}

.admin-sidebar-item:hover {
  background-color: var(--color-sidebar-item-hover);
  color: var(--color-primary);
}

.admin-sidebar-item.active {
  background-color: var(--color-sidebar-item-active);
  color: var(--color-primary);
  font-weight: 500;
}

.admin-content {
  background-color: var(--color-content-bg);
  padding: var(--spacing-lg);
  margin: var(--spacing-md);
  border-radius: var(--border-radius-large);
  box-shadow: var(--shadow-base);
  border: 1px solid var(--color-content-border);
}

.admin-card {
  background-color: var(--color-card-bg);
  border: 1px solid var(--color-card-border);
  border-radius: var(--border-radius-base);
  box-shadow: var(--color-card-shadow);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-md);
}

.admin-card-header {
  border-bottom: 1px solid var(--color-border-light);
  padding-bottom: var(--spacing-md);
  margin-bottom: var(--spacing-md);
  font-size: 16px;
  font-weight: 500;
  color: var(--color-text);
}

.admin-table {
  background-color: var(--color-card-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-base);
  overflow: hidden;
}

.admin-table-header {
  background-color: var(--color-bg-secondary);
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--color-border);
  font-weight: 500;
  color: var(--color-text);
}

.admin-table-row {
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--color-border-light);
  transition: background-color 0.2s ease;
}

.admin-table-row:hover {
  background-color: var(--color-bg-secondary);
}

.admin-table-row:last-child {
  border-bottom: none;
}

/* 状态标签 */
.admin-status-tag {
  padding: 2px 8px;
  border-radius: var(--border-radius-small);
  font-size: 12px;
  font-weight: 500;
}

.admin-status-tag--success {
  background-color: rgba(82, 196, 26, 0.1);
  color: var(--color-success);
  border: 1px solid rgba(82, 196, 26, 0.2);
}

.admin-status-tag--warning {
  background-color: rgba(250, 173, 20, 0.1);
  color: var(--color-warning);
  border: 1px solid rgba(250, 173, 20, 0.2);
}

.admin-status-tag--danger {
  background-color: rgba(255, 77, 79, 0.1);
  color: var(--color-danger);
  border: 1px solid rgba(255, 77, 79, 0.2);
}

.admin-status-tag--info {
  background-color: rgba(24, 144, 255, 0.1);
  color: var(--color-info);
  border: 1px solid rgba(24, 144, 255, 0.2);
}

/* 按钮样式覆盖 */
.admin-layout .hehe-button--primary {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
}

.admin-layout .hehe-button--primary:hover {
  background-color: var(--color-primary-light);
  border-color: var(--color-primary-light);
}

.admin-layout .hehe-button--primary:active {
  background-color: var(--color-primary-dark);
  border-color: var(--color-primary-dark);
}

/* 表单样式 */
.admin-form {
  background-color: var(--color-card-bg);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-base);
  border: 1px solid var(--color-border);
}

.admin-form-item {
  margin-bottom: var(--spacing-md);
}

.admin-form-label {
  display: block;
  margin-bottom: var(--spacing-xs);
  font-weight: 500;
  color: var(--color-text);
}

/* 面包屑 */
.admin-breadcrumb {
  padding: var(--spacing-md) 0;
  color: var(--color-text-secondary);
}

.admin-breadcrumb-item {
  color: var(--color-text-tertiary);
}

.admin-breadcrumb-item.active {
  color: var(--color-primary);
}

.admin-breadcrumb-separator {
  margin: 0 var(--spacing-xs);
  color: var(--color-text-quaternary);
}

/* 统计卡片 */
.admin-stat-card {
  background: linear-gradient(135deg, var(--color-card-bg) 0%, var(--color-bg-secondary) 100%);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-base);
  padding: var(--spacing-lg);
  text-align: center;
  box-shadow: var(--shadow-base);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.admin-stat-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-dark);
}

.admin-stat-number {
  font-size: 24px;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: var(--spacing-xs);
}

.admin-stat-label {
  font-size: 14px;
  color: var(--color-text-secondary);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .admin-sidebar {
    width: 200px;
  }
  
  .admin-content {
    margin: var(--spacing-sm);
    padding: var(--spacing-md);
  }
  
  .admin-header {
    padding: 0 var(--spacing-md);
  }
}

@media (max-width: 576px) {
  .admin-sidebar {
    position: fixed;
    left: -240px;
    z-index: 1000;
    transition: left 0.3s ease;
  }
  
  .admin-sidebar.open {
    left: 0;
  }
  
  .admin-content {
    margin: var(--spacing-xs);
    padding: var(--spacing-sm);
  }
}
