import { MutationTree } from "vuex";
import { UserState } from "./types";

export const mutations: MutationTree<UserState> = {
  SET_USER(state, user: UserState) {
    Object.assign(state, user);
  },
};
