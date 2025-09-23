import { createApp } from 'vue';
import App from './app.vue';

import router from '@/router';
import { useSetupGuards } from '@/router/guards';
import { createPinia } from 'pinia';

// 使用已发布的 npm 包
import HeheUI from 'hehe-ui-components';
import { setTheme } from 'hehe-theme';
// import HeheUI from '@/mocks/hehe-ui-components';
// import { applyInitialTheme } from '@/mocks/hehe-theme';

// iframe 通信桥接
import { setupIframeBridge } from '@/bridge';

// 导入已发布包的样式
import 'hehe-theme/dist/hehe-theme.css';
import 'hehe-ui-components/dist/hehe-ui-components.css';

import '@/styles/reset.css';
import '@/styles/index.scss';

// 开发环境 Mock
if (import.meta.env.DEV) {
  const { setupMock } = await import('@/mocks');
  setupMock();
}

const app = createApp(App);

// 安装插件
app.use(createPinia());
app.use(router);
useSetupGuards(router);
app.use(HeheUI, { zIndex: 3000 });

// 初始化主题
setTheme('admin');

// 设置 iframe 通信
setupIframeBridge();

app.mount('#app');