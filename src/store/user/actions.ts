import { ActionTree } from "vuex";
import { RootState } from "../types";
import { UserState } from "./types";

export const actions: ActionTree<UserState, RootState> = {
  async getUserById({ commit }, payload: number) {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/users/${payload}`
    );
    const json = await res.json();
    commit("SET_USER", json);
  },
  async getRandomUser({ commit }) {
    const res = await fetch(
      "https://random-data-api.com/api/users/random_user"
    );
    const json = await res.json();
    commit("SET_USER", {
      name: `${json.first_name} ${json.last_name}`,
      username: json.username,
      sex: json.gender,
      birthdate: json.date_of_birth,
    });
  },
};
