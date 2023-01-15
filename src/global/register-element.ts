import { App } from 'vue';
import {
  ElTabs,
  ElTabPane,
  ElForm,
  ElFormItem,
  ElInput,
  ElCheckbox,
  ElLink,
  ElButton
} from 'element-plus';
const components = [
  ElTabs,
  ElTabPane,
  ElForm,
  ElFormItem,
  ElInput,
  ElCheckbox,
  ElLink,
  ElButton
];
export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component);
  }
}
