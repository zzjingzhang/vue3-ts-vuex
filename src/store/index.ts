import { createStore, Store, useStore as useVuexStore } from 'vuex';
import type { IRootState, IStoreType } from './types';
import login from './login/login';

const store = createStore<IRootState>({
  state: () => {
    return {
      name: 'abc',
      age: 18
    };
  },
  modules: {
    login
  }
});

export function setupStore() {
  store.dispatch('login/loadLocalLogin');
}

export function useStore(): Store<IStoreType> {
  return useVuexStore();
}
export default store;
