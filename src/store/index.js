import { createStore } from "vuex";

import registerModule from "./modules/register/index";

const store = createStore({
  modules: {
    register: registerModule,
  },

  state() {
    return {
      //userId: 'c3'
    };
  },

  getters: {
    /*userId(state) {
      return state.userId;
    }*/
  },
});

export default store;
