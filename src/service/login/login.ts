import myRequest from '../index';
import type { IAccount, ILoginResult } from './type';
import type { IDataType } from '@/service/types';

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/', // user/id
  UserMenus = '/role/' // 用法 role/id/menu
}
export function accountLoginRequest(account: IAccount) {
  return myRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  });
}

export function requestUserInfoById(id: number) {
  return myRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false
  });
}

export function requestUserMenusByRoleId(id: number) {
  return myRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu',
    showLoading: false
  });
}
