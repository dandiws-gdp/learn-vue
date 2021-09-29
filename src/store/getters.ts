import { GetterTree } from "vuex";
import { RootState } from "./types";

export const getters: GetterTree<RootState, RootState> = {
  doneTodos(state) {
    return state.todos.filter((todo) => todo.done);
  },
  doneTodosCount(state, getters) {
    return getters.doneTodos.length;
  },
};
