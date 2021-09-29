import { MutationTree } from "vuex";
import { RootMutationType, RootState } from "./types";

export const mutations: MutationTree<RootState> = {
  [RootMutationType.ADD_TODO]: function (state, text: string) {
    state.todos.push({
      id: new Date().getTime(),
      text,
      done: false,
    });
  },
  [RootMutationType.REMOVE_TODO]: function (state, id: number) {
    const idx = state.todos.findIndex((todo) => todo.id == id);
    if (idx !== -1) {
      state.todos.splice(idx, 1);
    }
  },
  [RootMutationType.FINISH_TODO]: function (state, id: number) {
    const idx = state.todos.findIndex((todo) => todo.id == id);
    if (idx !== -1) {
      state.todos[idx].done = true;
    }
  },
};
