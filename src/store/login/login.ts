import { Module } from 'vuex';
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/service/login/login';
import router from '@/router';
import localCache from '@/utils/cache';
import { mapMenusToRoutes, mapMenusToPermission } from '@/utils/map-menus';
import type { IRootState } from '../types';
import type { ILoginState } from './types';
import { IAccount } from '@/service/login/type';

// Module<S, R>  s：是模块中state的类型；  r ：是根store中的state类型
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      useInfo: {},
      userMenus: [],
      permissions: []
    };
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token;
    },
    changeUserInfo(state, useInfo: any) {
      state.useInfo = useInfo;
    },
    changeUserMenus(state, menus: any[]) {
      state.userMenus = menus;
      const routes = mapMenusToRoutes(menus);
      routes.forEach((route) => {
        router.addRoute('main', route);
      });

      // 获取用户按钮权限

      const permissions = mapMenusToPermission(menus);
      state.permissions = permissions;
    }
  },
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      // 1.实现登录逻辑
      const loginResult = await accountLoginRequest(payload);
      const { id, token } = loginResult.data;
      commit('changeToken', token);
      localCache.setCache('token', token);

      // 发送初始化请求(完整的role/department)
      dispatch('getInitialDataAction', null, { root: true });

      // 2.请求用户信息
      const userInfoResult = await requestUserInfoById(id);
      const useInfo = userInfoResult.data;
      commit('changeUserInfo', useInfo);
      localCache.setCache('useInfo', useInfo);

      // 3.获取用户菜单
      const userMenusResult = await requestUserMenusByRoleId(useInfo.role.id);
      const userMenus = userMenusResult.data;
      commit('changeUserMenus', userMenus);
      localCache.setCache('userMenus', userMenus);

      // 跳到首页
      router.push('/main');
    },
    phoneLoginAction({ commit }, paylod: any) {
      console.log('手机登录 payload');
    },
    loadLocalLogin({ commit, dispatch }) {
      const token = localCache.getCache('token');
      const useInfo = localCache.getCache('useInfo');
      const userMenus = localCache.getCache('userMenus');
      if (token) {
        commit('changeToken', token);
        dispatch('getInitialDataAction', null, { root: true });
      }
      if (useInfo) {
        commit('changeUserInfo', useInfo);
      }
      if (userMenus) {
        commit('changeUserMenus', userMenus);
      }
    }
  }
};

export default loginModule;
