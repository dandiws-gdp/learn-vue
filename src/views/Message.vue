<template>
  <div>
    <h1 class="text-lg mb-5">Channel : {{ $route.params.channelId }}</h1>

    <div class="h-96 relative flex flex-col">
      <div
        class="overflow-y-auto flex-1 p-3 bg-gray-100 rounded-sm"
        id="messages-wrapper"
        ref="messagesWrapper"
      >
        <div
          class="text-sm"
          v-for="message in channel.messages"
          :key="message.id"
        >
          <p class="px-2 py-1 mb-2 rounded-sm bg-gray-200 inline-block">
            {{ message.text }}
          </p>
        </div>
      </div>
      <input
        ref="inputField"
        class="px-2 py-2 bg-gray-200 outline-none focus:ring-1 z-10"
        type="text"
        v-model="message"
        placeholder="Type message..."
        @keyup.enter="sendMessage"
      />
    </div>
  </div>
</template>

<script lang="ts">
import gql from "graphql-tag";
import Vue from "vue";

const AddMessageMutation = gql`
  mutation AddMessage($channelId: ID!, $text: String) {
    addMessage(message: { channelId: $channelId, text: $text }) {
      id
      text
    }
  }
`;

export default Vue.extend({
  data: function () {
    return {
      message: "",
    };
  },
  methods: {
    sendMessage() {
      if (!this.message) {
        return;
      }

      this.$apollo.mutate({
        client: "local",
        mutation: AddMessageMutation,
        variables: {
          channelId: this.$route.params.channelId,
          text: this.message,
        },
      });

      this.message = "";
    },
  },
  apollo: {
    channel: {
      client: "local",
      query: gql`
        query GetMessages($channelId: ID!) {
          channel(id: $channelId) {
            messages {
              id
              text
            }
          }
        }
      `,
      variables() {
        return {
          channelId: parseFloat(this.$route.params.channelId),
        };
      },
      subscribeToMore: {
        document: gql`
          subscription MessageSubscription($channelId: ID!) {
            messageAdded(channelId: $channelId) {
              id
              text
            }
          }
        `,
        variables() {
          return {
            channelId: this.$route.params.channelId,
          };
        },
        updateQuery: (prev, { subscriptionData }) => {
          let wrapper = document.getElementById("messages-wrapper");
          wrapper && (wrapper.scrollTop = wrapper.scrollHeight);
          prev.channel.messages.push(subscriptionData.data.messageAdded);
          return prev;
        },
      },
    },
  },
  mounted() {
    // this.$refs.inputField?.focus();
    console.log(this.$refs);
  },
});
</script>
