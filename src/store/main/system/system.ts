import { Module } from 'vuex';

import type { IRootState } from '@/store/types';
import { ISystemState } from './types';

import { getPageListData } from '@/service/main/system/system';

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      useList: [],
      userCount: 0
    };
  },
  mutations: {
    changeUserList(state, useList: any[]) {
      state.useList = useList;
    },
    changeUserCount(state, userCount: number) {
      state.userCount = userCount;
    }
  },

  actions: {
    async getPageListAction({ commit }, payload: any) {
      const pageResult = await getPageListData(
        payload.pageUrl,
        payload.queryInfo
      );
      const { list, totalCount } = pageResult.data;
      commit('changeUserList', list);
      commit('changeUserCount', totalCount);
    }
  }
};

export default systemModule;
