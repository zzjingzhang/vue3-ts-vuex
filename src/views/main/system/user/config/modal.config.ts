import { IForm } from '@/base-ui/form';
export const modalConfig: IForm = {
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '用户名',
      rules: [],
      placeholder: '请输入用户名'
    },
    {
      field: 'realname',
      type: 'input',
      label: '真实姓名',
      rules: [],
      placeholder: '请输入真实姓名'
    },
    {
      field: 'password',
      type: 'password',
      label: '密码',
      rules: [],
      placeholder: '请输入密码',
      isHidden: false
    },
    {
      field: 'cellphone',
      type: 'input',
      label: '电话号码',
      rules: [],
      placeholder: '请输入手机号'
    },
    {
      field: 'roleId',
      type: 'select',
      label: '选择角色',
      rules: [],
      placeholder: '请选择角色',
      options: []
    },
    {
      field: 'departmentId',
      type: 'select',
      label: '选择部门',
      rules: [],
      placeholder: '请选择部门',
      options: []
    }
  ],
  // labelWidth: '120px',
  itemStyle: {},
  colLayout: { span: 24 }
};
