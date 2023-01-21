import { createStore, Store, useStore as useVuexStore } from 'vuex';
import type { IRootState, IStoreType } from './types';
import login from './login/login';
import system from './main/system/system';

const store = createStore<IRootState>({
  state: () => {
    return {
      name: 'abc',
      age: 18
    };
  },
  modules: {
    login,
    system
  }
});

export function setupStore() {
  store.dispatch('login/loadLocalLogin');
}

export function useStore(): Store<IStoreType> {
  return useVuexStore();
}
export default store;
