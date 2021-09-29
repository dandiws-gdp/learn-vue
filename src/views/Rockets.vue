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
import gql from "graphql-tag";

const USERS_QUERY = gql`
  query {
    users {
      id
      name
      rocket
      timestamp
      twitter
    }
  }
`;
const INSERT_USER_MUTATION = gql`
  mutation insertUser($name: String!, $rocket: String!, $twitter: String!) {
    insert_users(objects: { name: $name, rocket: $rocket, twitter: $twitter }) {
      returning {
        id
        name
        rocket
        timestamp
        twitter
      }
    }
  }
`;

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
      const result = await this.$apollo.mutate({
        mutation: INSERT_USER_MUTATION,
        variables: {
          name: this.name,
          twitter: this.twitter,
          rocket: this.rocket,
        },
        update(cache, { data: { insert_users } }) {
          const user = insert_users?.returning;
          const data = cache.readQuery({
            query: USERS_QUERY,
          });
          data.users.push(user[0]);
          cache.writeQuery({
            query: USERS_QUERY,
            data,
          });
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
