import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () =>
      import(/* webpackChunkName: "home" */ "@/views/HomeView.vue"),
  },
  {
    path: "/account",
    name: "account",
    component: () =>
      import(/* webpackChunkName: "account" */ "@/views/AccountView.vue"),
  },
  {
    path: "/devices",
    name: "devices",
    component: () =>
      import(/* webpackChunkName: "devices" */ "@/views/DevicesView.vue"),
  },
  {
    path: "/chats",
    name: "chats",
    component: () =>
      import(/* webpackChunkName: "chats" */ "@/views/ChatView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
