<template>
  <div>
    <h1 class="text-2xl font-semibold">Vee-validate</h1>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form
        @submit.prevent="handleSubmit(onSubmit)"
        class="space-y-4 my-5 mb-12"
      >
        <div>
          <ValidationProvider
            rules="required|alpha_spaces|notJohnDoe"
            v-slot="v"
          >
            <input
              class="form-control"
              type="text"
              name="name"
              placeholder="Full Name"
              v-model="name"
            />
            <span class="text-red-600" v-if="v.failed">{{ v.errors[0] }}</span>
          </ValidationProvider>
        </div>

        <div>
          <ValidationProvider
            rules="required|email"
            v-slot="{ errors, failed }"
          >
            <input
              class="form-control"
              type="text"
              name="email"
              placeholder="Email"
              v-model="email"
            />
            <span class="text-red-600" v-if="failed">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div>
          <ValidationProvider
            rules="required|min:6"
            v-slot="{ errors, failed }"
            vid="password"
          >
            <input
              class="form-control"
              type="password"
              name="password"
              placeholder="Password"
              v-model="password"
            />
            <span class="text-red-600" v-if="failed">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div>
          <ValidationProvider
            rules="required|confirmed:password"
            v-slot="{ errors, failed }"
          >
            <input
              class="form-control"
              type="password"
              name="confirm"
              placeholder="Confirm Password"
              v-model="confirm"
            />
            <span class="text-red-600" v-if="failed">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="flex pt-5">
          <button
            class="ml-auto btn bg-blue-400 text-white hover:bg-blue-500"
            type="submit"
          >
            Create account
          </button>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data: () => ({
    name: "",
    email: "",
    password: "",
    confirm: "",
  }),
  methods: {
    onSubmit() {
      alert("Form submitted");
    },
  },
});
</script>

<style></style>
