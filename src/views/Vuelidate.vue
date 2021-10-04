<template>
  <div>
    <h1 class="text-2xl font-semibold">Vuelidate</h1>
    <form @submit.prevent="handleSubmit" class="space-y-4 my-5 mb-12">
      <div>
        <input
          class="form-control"
          type="text"
          name="name"
          placeholder="Full Name"
          v-model="v$.name.$model"
        />
        <span class="text-red-600" v-if="v$.name.$error">{{
          v$.name.$errors[0].$message
        }}</span>
      </div>
      <div>
        <input
          class="form-control"
          type="text"
          name="email"
          placeholder="Email"
          v-model="v$.email.$model"
        />
        <span class="text-red-600" v-if="v$.email.$error">{{
          v$.email.$errors[0].$message
        }}</span>
      </div>
      <div>
        <input
          class="form-control"
          type="password"
          name="password"
          placeholder="Password"
          v-model="v$.password.$model"
        />
        <span class="text-red-600" v-if="v$.password.$error">{{
          v$.password.$errors[0].$message
        }}</span>
      </div>
      <div>
        <input
          class="form-control"
          type="password"
          name="confirm"
          placeholder="Confirm Password"
          v-model="v$.confirm.$model"
        />
        <span class="text-red-600" v-if="v$.confirm.$error">{{
          v$.confirm.$errors[0].$message
        }}</span>
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
  </div>
</template>

<script lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { defineComponent } from "@vue/composition-api";
import {
  required,
  email,
  minLength,
  maxLength,
  sameAs,
  helpers,
} from "@vuelidate/validators";
import { isValidName } from "@/utils/isValidName";

export default defineComponent({
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data: () => ({
    name: "",
    email: "",
    password: "",
    confirm: "",
  }),
  methods: {
    async handleSubmit() {
      const isValid = await this.v$.$validate();

      if (isValid) {
        alert("Form submitted");
      }
    },
  },
  validations() {
    return {
      name: {
        required,
        isValidName: helpers.withMessage(
          "Name must only consist of alphabet and spaces",
          isValidName
          // helpers.regex(/^[a-zA-Z\s]*$/)
        ),
        maxLength: maxLength(100),
      },
      email: { required, email },
      password: { required, minLength: minLength(6) },
      // confirm: { required, sameAs: sameAs(this.password) },
      confirm: {
        required,
        sameAs: helpers.withMessage(
          "Confirm password not match",
          sameAs(this.password)
        ),
      },
    };
  },
});
</script>

<style></style>
