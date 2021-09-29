import Vue from "vue";
import Vuex from "vuex";
import { mutations } from "./mutations";
import { getters } from "./getters";
import { RootState } from "@/store/types";
import { user } from "@/store/user";

Vue.use(Vuex);

const store = new Vuex.Store<RootState>({
  state: {
    todos: [],
  },
  getters,
  mutations,
  modules: {
    user,
  },
});

export default store;
