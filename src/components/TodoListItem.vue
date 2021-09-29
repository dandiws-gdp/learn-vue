<template>
  <div
    @click="$emit('finish', todo.id)"
    :data-todo-done="String(todo.done)"
    class="px-4 py-2 bg-gray-200 rounded-sm cursor-pointer flex"
    :class="{ 'opacity-50': todo.done }"
  >
    <span
      aria-roledescription="todo-text"
      :class="{ 'line-through': todo.done }"
      >{{ todo.text }}</span
    >
    <button
      class="
        ml-auto
        w-5
        h-5
        hover:bg-gray-300
        text-gray-600
        rounded-sm
        flex
        justify-center
        items-center
      "
      @click="$emit('remove', todo.id)"
    >
      &times;
    </button>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { Todo } from "../store/types";

export default Vue.extend({
  props: {
    todo: {
      type: Object as PropType<Todo>,
      required: true,
    },
  },
});
</script>
