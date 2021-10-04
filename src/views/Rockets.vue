<template>
  <div class="py-5">
    <div class="space-x-3 mb-5">
      <input
        type="text"
        v-model="name"
        placeholder="Name"
        class="px-3 py-2 rounded-md bg-gray-100"
        :disabled="adding"
      />
      <input
        type="text"
        v-model="rocket"
        placeholder="Rocket"
        class="px-3 py-2 rounded-md bg-gray-100"
        :disabled="adding"
      />
      <input
        type="text"
        v-model="twitter"
        placeholder="Twitter"
        class="px-3 py-2 rounded-md bg-gray-100"
        :disabled="adding"
      />
      <button
        @click="addUser"
        class="px-3 py-2 rounded-md bg-blue-300 text-blue-900"
      >
        <span v-if="adding">Adding...</span>
        <span v-else>Add user</span>
      </button>
    </div>
    <div class="grid grid-cols-3 gap-3">
      <div v-if="$apollo.queries.users.loading">Loading...</div>
      <div
        class="px-5 py-4 bg-gray-100 rounded-lg w-3/12 flex flex-col w-full"
        v-for="user in users"
        :key="user.id"
      >
        <div class="flex mb-3 items-center">
          <h3 class="text-lg font-bold">
            {{ user.name }}
          </h3>
          <!-- <span
          v-if="rocket.active"
          class="bg-green-200 text-sm px-2 rounded-md ml-3"
          >Active</span
        >
        <span v-else class="bg-gray-300 text-sm px-2 rounded-md ml-3"
          >Inactive</span
        > -->
        </div>
        <!-- <p class="text-gray-500 mb-4">{{ rocket.description }}</p> -->
        <div class="text-sm mt-auto space-y-2">
          <div class="flex justify-between">
            <span>Rocket</span>
            <span>{{ user.rocket }}</span>
          </div>
          <div class="flex justify-between">
            <span>Twitter</span>
            <span>{{ user.twitter }}</span>
          </div>
          <div class="flex justify-between">
            <span>Created</span>
            <span>{{ new Date(user.timestamp).toDateString() }}</span>
          </div>
          <!-- <div class="flex justify-between">
          <span>Country</span>
          <span>{{ rocket.country }}</span>
        </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {
  USERS_QUERY,
  INSERT_USER_MUTATION,
  UsersQuery,
  InsertUserMutation,
  InsertUserVariables,
} from "@/graphql/index";

export default Vue.extend({
  data: function () {
    return {
      name: "",
      rocket: "",
      twitter: "",
      adding: false,
    };
  },
  methods: {
    async addUser() {
      this.adding = true;
      const result = await this.$apollo.mutate<
        InsertUserMutation,
        InsertUserVariables
      >({
        mutation: INSERT_USER_MUTATION,
        variables: {
          name: this.name,
          twitter: this.twitter,
          rocket: this.rocket,
        },
        update(cache, { data }) {
          if (!data) {
            return;
          }

          const insertedUsers = data.insert_users.returning;
          const usersCache = cache.readQuery<UsersQuery>({
            query: USERS_QUERY,
          });

          if (usersCache) {
            usersCache.users.push(insertedUsers[0]);
            cache.writeQuery<UsersQuery>({
              query: USERS_QUERY,
              data: usersCache,
            });
          }
        },
      });

      this.adding = false;

      if (result) {
        this.name = "";
        this.rocket = "";
        this.twitter = "";
      }
    },
  },
  apollo: {
    users: USERS_QUERY,
  },
});
</script>

<style></style>
