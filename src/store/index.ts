import { createStore } from 'vuex';
import type { IRootState } from './types';
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

export default store;
