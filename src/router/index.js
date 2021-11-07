import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Inventory from "../views/Inventory.vue";
import CreateInventory from "../views/CreateInventory.vue";
import Pos from "../views/Pos.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/inventories",
    name: "Inventory",
    component: Inventory,
  },
  {
    path: "/pos",
    name: "Pos",
    component: Pos,
  },
  {
    path: "/inventories/create",
    name: "CreateInventory",
    component: CreateInventory,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
