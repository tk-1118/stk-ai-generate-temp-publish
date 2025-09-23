// 使用 hehe-shared 包中的 iframe 通信协议
import { createIframeBridge, type IframeBridgeOptions } from 'hehe-shared';
import { setTheme } from 'hehe-theme';
import { setToken } from '@/auth/token';
import router from '@/router';

// createIframeBridge 函数现在从 hehe-shared 包导入

// 默认配置
export function setupIframeBridge() {
  return createIframeBridge({
    // slug 会从 INIT 消息中自动获取
    onInit({ token, theme, route }) {
      console.log('[Bridge] 收到初始化消息', { token, theme, route });
      
      if (token) {
        setToken(token);
      }
      
      if (theme) {
        setTheme(theme as 'light' | 'dark' | 'admin');
        localStorage.setItem('THEME_MODE', theme);
      }
      
      if (route && route !== router.currentRoute.value.path) {
        router.replace(route);
      }
    },
    
    onTheme({ mode }) {
      console.log('[Bridge] 主题变更', mode);
      setTheme(mode);
      localStorage.setItem('THEME_MODE', mode);
    },
    
    onAuth({ token }) {
      console.log('[Bridge] 认证变更');
      setToken(token);
    }
  });
}