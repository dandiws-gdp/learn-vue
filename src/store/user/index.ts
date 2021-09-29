import { Module } from "vuex";
import { RootState } from "../types";
import { UserState } from "./types";
import { getters } from "./getters";
import { mutations } from "./mutations";
import { actions } from "./actions";

const state: UserState = {
  name: "Dandi",
  sex: "Female",
  username: "dandiws",
  birthdate: "1990-12-12",
};

export const user: Module<UserState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
