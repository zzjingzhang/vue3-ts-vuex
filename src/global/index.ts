import { App } from 'vue';
import { registerElement, registerIcons } from './register-element';

export function globalRegister(app: App): void {
  // 写法一
  // registerElement(app);
  //写法二
  app.use(registerElement);
  app.use(registerIcons);
}
