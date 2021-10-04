<template>
  <div id="app" class="px-60">
    <div class="py-12">
      <router-link class="px-2 py-2 hover:bg-gray-100 rounded-md" to="/"
        >Todo List</router-link
      >
      <router-link class="px-2 py-2 hover:bg-gray-100 rounded-md" :to="`/users`"
        >User</router-link
      >
      <router-link
        class="px-2 py-2 hover:bg-gray-100 rounded-md"
        :to="`/rockets`"
        >Rockets</router-link
      >
      <router-link
        class="px-2 py-2 hover:bg-gray-100 rounded-md"
        :to="`/messages`"
        >Messages</router-link
      >
      <router-link
        class="px-2 py-2 hover:bg-gray-100 rounded-md"
        :to="`/vuelidate`"
        >Vuelidate</router-link
      >
      <router-link
        class="px-2 py-2 hover:bg-gray-100 rounded-md"
        :to="`/vee-validate`"
        >Vee-validate</router-link
      >
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",
  computed: {},
});
</script>
