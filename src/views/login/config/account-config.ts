import { reactive } from 'vue';
import type { FormRules } from 'element-plus';
export const rules = reactive<FormRules>({
  name: [
    { required: true, message: '账号为必填内容~', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{5,10}$/,
      message: '用户名必须是5~10个字母或者数字~',
      trigger: 'blur'
    }
  ],
  pwd: [
    { required: true, message: '密码为必填内容~', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{3,}$/,
      message: '密码必须是3位以上字母或者数字~',
      trigger: 'blur'
    }
  ]
});
