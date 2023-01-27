import { createStore, Store, useStore as useVuexStore } from 'vuex';
import type { IRootState, IStoreType } from './types';
import login from './login/login';
import system from './main/system/system';
import dashboard from './main/analysis/dashboard';
import { getPageListData } from '@/service/main/system/system';

const store = createStore<IRootState>({
  state() {
    return {
      name: 'abc',
      age: 18,
      entireDepartment: [], // 全部部门
      entireRole: [], // 全部角色
      entireMenu: []
    };
  },
  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartment = list;
    },
    changeEntireRole(state, list) {
      state.entireRole = list;
    },
    changeEntireMenu(state, list) {
      state.entireMenu = list;
    }
  },
  actions: {
    async getInitialDataAction({ commit }) {
      // 请求部门、角色、菜单数据
      const depResult = await getPageListData('/department/list', {
        offset: 0,
        size: 1000
      });
      const { list: departmentList } = depResult.data;
      const roleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 1000
      });
      const { list: roleList } = roleResult.data;
      const menuResult = await getPageListData('/menu/list', {});
      const { list: menutList } = menuResult.data;
      commit('changeEntireDepartment', departmentList);
      commit('changeEntireRole', roleList);
      commit('changeEntireMenu', menutList);

      // 保存数据
    }
  },
  modules: {
    login,
    system,
    dashboard
  }
});

export function setupStore() {
  store.dispatch('login/loadLocalLogin');
}

export function useStore(): Store<IStoreType> {
  return useVuexStore();
}
export default store;
