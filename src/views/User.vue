<template>
  <div>
    <div class="mb-5 w-1/2">
      <div class="flex justify-between">
        <span>Name</span><span>{{ user.name }}</span>
      </div>
      <div class="flex justify-between">
        <span>Username</span><span>{{ user.username }}</span>
      </div>
      <div class="flex justify-between">
        <span>Sex</span><span>{{ user.sex }}</span>
      </div>
      <div class="flex justify-between">
        <span>Birthday</span><span>{{ user.birthdate }}</span>
      </div>
      <hr class="my-5" />
      <div class="flex justify-between">
        <span>Age</span><span>{{ ageYearsOld }} years old</span>
      </div>
    </div>
    <button
      class="px-5 py-2 rounded-md bg-blue-100 hover:bg-blue-200 text-blue-900"
      @click="getRandomUser"
    >
      Random user
    </button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters, mapState } from "vuex";

export default Vue.extend({
  name: "User",
  computed: {
    // user() {
    //   return this.$store.state.user;
    // },
    // ageYearsOld() {
    //   return this.$store.getters['user/ageYearsOld'];
    // },

    ...mapState(["user"]),
    // ...mapState({
    //   user: (state) => state.user,
    // }),
    // ...mapState({
    //   user: 'user',
    // }),

    // ...mapGetters(["user/ageYearsOld"]),
    ...mapGetters({ ageYearsOld: "user/ageYearsOld" }),
  },
  methods: {
    // getRandomUser() {
    //   this.$store.dispatch("getRandomUser");
    // },
    // ...mapActions({
    //   getUserById: "getUserById",
    //   getRandomUser: "getRandomUser",
    // }),
    ...mapActions({
      getUserById: "user/getUserById",
      getRandomUser: "user/getRandomUser",
    }),
  },
});
</script>

<style></style>
