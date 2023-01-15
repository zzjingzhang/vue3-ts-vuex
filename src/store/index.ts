import { createStore } from 'vuex';

// export default createStore({
//   state: {},
//   getters: {},
//   mutations: {},
//   actions: {},
//   modules: {}
// });

const store = createStore({
  state: () => {
    return {
      name: 'abc'
    };
  }
});

export default store;
