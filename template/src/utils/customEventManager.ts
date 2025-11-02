// CustomEvent 事件通信管理器
// 用于微应用与主应用之间的通信

export class CustomEventManager {
  // 发送自定义事件
  static dispatchEvent(eventName: string, data: any) {
    const event = new CustomEvent(eventName, {
      detail: data,
      bubbles: true,
      cancelable: true
    });
    window.dispatchEvent(event);
  }

  // 监听自定义事件
  static addEventListener(eventName: string, callback: (event: Event) => void) {
    window.addEventListener(eventName, callback as EventListener);
  }

  // 移除事件监听
  static removeEventListener(eventName: string, callback: (event: Event) => void) {
    window.removeEventListener(eventName, callback as EventListener);
  }

  // 发送微应用间消息
  static sendMicroAppMessage(from: string, to: string, messageType: string, data: any) {
    this.dispatchEvent('microAppMessage', {
      from,
      to,
      message: {
        type: messageType,
        data
      }
    });
  }

  // 监听微应用消息
  static onMicroAppMessage(callback: (from: string, to: string, messageType: string, data: any) => void) {
    const handler = (event: Event) => {
      const customEvent = event as CustomEvent;
      const { from, to, message } = customEvent.detail;
      callback(from, to, message.type, message.data);
    };
    
    this.addEventListener('microAppMessage', handler);
    
    // 返回取消监听的函数
    return () => {
      this.removeEventListener('microAppMessage', handler);
    };
  }
}
