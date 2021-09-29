<template>
  <div class="px-5 py-5 space-y-3">
    <div class="flex space-x-3 mb-6">
      <input
        type="text"
        v-model="newTodoText"
        class="px-3 py-2 rounded-sm border flex-1"
        placeholder="New todo"
        @keyup.enter="handleAddTodo"
      />
      <button @click="handleAddTodo" class="px-3 py-2 bg-gray-300 rounded-sm">
        Add Todo
      </button>
    </div>
    <p>{{ todosCount }} todo done from total {{ todos.length }} todos</p>
    <todo-list-item
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      @finish="finishTodo(todo.id)"
      @remove="removeTodo(todo.id)"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TodoListItem from "@/components/TodoListItem.vue";
import { mapGetters, mapMutations, mapState } from "vuex";
import { RootMutationType } from "@/store/types";

export default Vue.extend({
  data: function () {
    return {
      newTodoText: "",
    };
  },
  computed: {
    ...mapState(["todos"]),
    ...mapGetters({
      todosCount: "doneTodosCount",
    }),

    // todos() {
    //   return this.$store.state.todos
    // },
    // todosCount() {
    //   return this.$store.getters.doneTodosCount;
    // },
  },
  methods: {
    ...mapMutations({
      addTodo: RootMutationType.ADD_TODO,
      removeTodo: RootMutationType.REMOVE_TODO,
      finishTodo: RootMutationType.FINISH_TODO,
    }),
    handleAddTodo() {
      if (this.newTodoText !== "") {
        this.addTodo(this.newTodoText);
        this.$store.commit(RootMutationType.ADD_TODO, this.newTodoText);
        this.newTodoText = "";
      }
    },
  },
  components: {
    TodoListItem,
  },
});
</script>
