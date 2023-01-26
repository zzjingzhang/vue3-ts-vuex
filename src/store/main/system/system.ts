import { Module } from 'vuex';

import type { IRootState } from '@/store/types';
import { ISystemState } from './types';

import {
  getPageListData,
  deletePageData,
  createPageData,
  editPageData
} from '@/service/main/system/system';

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
    };
  },
  mutations: {
    changeUsersList(state, list: any[]) {
      state.usersList = list;
    },
    changeUsersCount(state, count: number) {
      state.usersCount = count;
    },
    changeRoleList(state, list: any[]) {
      state.roleList = list;
    },
    changeRoleCount(state, count: number) {
      state.roleCount = count;
    },
    changeGoodsList(state, list: any[]) {
      state.goodsList = list;
    },
    changeGoodsCount(state, count: number) {
      state.goodsCount = count;
    },
    changeMenuList(state, list: any[]) {
      state.menuList = list;
    },
    changeMenuCount(state, count: number) {
      state.menuCount = count;
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`];
      };
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`];
      };
    }
  },

  actions: {
    async getPageListAction({ commit }, payload: any) {
      // 获取pageUrl
      const pageName = payload.pageName;
      const pageUrl = `${pageName}/list`;

      // 发送请求
      const pageResult = await getPageListData(pageUrl, payload.queryInfo);
      const { list, totalCount } = pageResult.data;
      const changePageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1);
      commit(`change${changePageName}List`, list);
      commit(`change${changePageName}Count`, totalCount);
    },
    // 删除
    async deletePageDataAction({ dispatch }, payload: any) {
      const { pageName, id } = payload;
      const pageUrl = `/${pageName}/${id}`;
      await deletePageData(pageUrl);
      // 重新请求数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      });
    },
    // 新增
    async createPageDataAction({ dispatch }, payload: any) {
      const { pageName, newData } = payload;
      const pageUrl = `/${pageName}`;
      await createPageData(pageUrl, newData);
      // 重新请求数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      });
    },
    // 编辑
    async editPageDataAction({ dispatch }, payload: any) {
      const { pageName, editData, id } = payload;
      const pageUrl = `/${pageName}/${id}`;
      await editPageData(pageUrl, editData);
      // 重新请求数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      });
    }
    // 编辑
  }
};

export default systemModule;
