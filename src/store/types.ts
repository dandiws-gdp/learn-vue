export interface Todo {
  id: number;
  text: string;
  done: boolean;
}

export interface RootState {
  todos: Todo[];
}

export enum RootMutationType {
  ADD_TODO = "ADD_TODO",
  REMOVE_TODO = "REMOVE_TODO",
  FINISH_TODO = "FINISH_TODO",
}
