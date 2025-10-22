import './public-path';
import { createApp } from 'vue';
import type { App as Root } from 'vue';
import App from './app.vue';

import router from '@/router';
import { useSetupGuards } from '@/router/guards';
import { createPinia } from 'pinia';

// 使用已发布的 npm 包
import HeheUI from 'hehe-ui-components';
import { setTheme } from 'hehe-theme';
// import HeheUI from '@/mocks/hehe-ui-components';
// import { applyInitialTheme } from '@/mocks/hehe-theme';

// 导入已发布包的样式
import 'hehe-theme/dist/hehe-theme.css';
import 'hehe-ui-components/dist/hehe-ui-components.css';

import '@/styles/reset.css';
import '@/styles/index.scss';

import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper';

let instance: Root<Element> | null = null;
function render(props: any = {}) {
  console.log('[product-foo-prd] render called with props:', props);
  const { container } = props;
  console.log('[product-foo-prd] container:', container);
  console.log('[product-foo-prd] 容器元素：',  container ? container.querySelector('#app') : document.querySelector('#app'));
  
  // 如果已经有实例，先卸载
  if (instance) {
    console.log('[product-foo-prd] unmounting existing instance');
    instance.unmount();
    instance = null;
  }
  
  instance = createApp(App);
  const pinia = createPinia();
  
  instance.use(pinia);
  instance.use(router);
  useSetupGuards(router);
  instance.use(HeheUI, { zIndex: 3000 });
  
  // 初始化主题
  setTheme('admin');
  
  // 开发环境 Mock
  if (import.meta.env.DEV) {
    import('@/mocks').then(({ setupMock }) => {
      setupMock();
    });
  }
  
  instance.mount(container ? container.querySelector('#app') : '#app');  

  // 添加微应用标识到根元素
  if (container) {
    container.setAttribute('data-micro-app', 'product-foo-prd');
  } else {
    document.documentElement.setAttribute('data-micro-app', 'product-foo-prd');
  }
}

console.log('是否是qiankun环境：', !!qiankunWindow.__POWERED_BY_QIANKUN__);
// 独立运行时
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render();
}

// qiankun 生命周期函数
const bootstrap = async () => {
  console.log('[product-foo-prd] vue app bootstraped');
  return Promise.resolve();
};

const mount = async (props: any) => {
  console.log('[product-foo-prd] mount called with props:', props);
  console.log('[product-foo-prd] container from props:', props?.container);
  render(props);
};

const unmount = async (props: any) => {
  console.log('[product-foo-prd] vue app unmount', props);
  if (instance) {
    instance.unmount();
    if (instance._container) {
      instance._container.innerHTML = '';
    }
    instance = null;
  }
};

// 按照 vite-plugin-qiankun 的要求导出
if (qiankunWindow.__POWERED_BY_QIANKUN__) {
  // 注册生命周期函数到全局对象
  if (!(window as any).moudleQiankunAppLifeCycles) {
    (window as any).moudleQiankunAppLifeCycles = {};
  }
  (window as any).moudleQiankunAppLifeCycles['product-foo-prd'] = {
    bootstrap,
    mount,
    unmount
  };
}

// 同时保持标准导出（以防万一）
export { bootstrap, mount, unmount };