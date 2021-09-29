import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "@/views/Home.vue";
import User from "@/views/User.vue";
import Rockets from "@/views/Rockets.vue";
import Message from "@/views/Message.vue";

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/users",
    name: "User",
    component: User,
  },
  {
    path: "/rockets",
    name: "Rockets",
    component: Rockets,
  },
  {
    path: "/messages/:channelId",
    name: "Messages",
    component: Message,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
