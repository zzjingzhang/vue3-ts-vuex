import { App } from 'vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import {
  ElTabs,
  ElTabPane,
  ElForm,
  ElFormItem,
  ElInput,
  ElCheckbox,
  ElLink,
  ElButton,
  ElContainer,
  ElHeader,
  ElAside,
  ElMain,
  ElMenu,
  ElSubMenu,
  ElIcon,
  ElMenuItem,
  ElMenuItemGroup
} from 'element-plus';
const components = [
  ElTabs,
  ElTabPane,
  ElForm,
  ElFormItem,
  ElInput,
  ElCheckbox,
  ElLink,
  ElButton,
  ElContainer,
  ElHeader,
  ElAside,
  ElMain,
  ElMenu,
  ElSubMenu,
  ElIcon,
  ElMenuItem,
  ElMenuItemGroup
];
// 注册组件
export function registerElement(app: App): void {
  for (const component of components) {
    app.component(component.name, component);
  }
}

// 注册图标
export function registerIcons(app: App<Element>) {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }
}
