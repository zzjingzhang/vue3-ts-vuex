type IFormType = 'input' | 'password' | 'select' | 'datepicker';

export interface IFormItem {
  type: IFormType;
  label: string;
  rules?: any[];
  placeholder?: string;
  // 针对select
  options?: any;
  // 针对特殊的属性
  otherOptions?: any;
  itemStyle?: string;
  field: string;
}

export interface IForm {
  formItems: IFormItem[];
  labelWidth?: string;
  itemStyle?: any;
  colLayout?: any;
}
