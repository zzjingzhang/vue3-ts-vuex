import { IForm } from '@/base-ui/form';
export const searchFormConfig: IForm = {
  formItems: [
    {
      type: 'input',
      label: 'id',
      rules: [],
      placeholder: '请输入查询id'
    },
    {
      type: 'input',
      label: '用户名',
      rules: [],
      placeholder: '请输入用户名'
    },
    {
      type: 'input',
      label: '真实姓名',
      rules: [],
      placeholder: '请输入真实姓名'
    },
    {
      type: 'input',
      label: '电话号码',
      rules: [],
      placeholder: '请输入手机号'
    },
    {
      type: 'select',
      label: '状态',
      rules: [],
      placeholder: '请选择状态',

      options: [
        { title: '篮球', value: 'basketball' },
        { title: '足球', value: 'football' }
      ]
    },
    {
      type: 'datepicker',
      label: '创建时间',
      rules: [],
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ],
  labelWidth: '120px',
  itemStyle: {
    padding: '5px 30px'
  },
  colLayout: {
    span: 8
  }
};
