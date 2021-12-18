<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title"> Application</v-list-item-title>
          <v-list-item-subtitle> Version : 0.0.1</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    drawer: null,
    value: "recent",
    items: [
      { title: "แดชบอร์ด", icon: "mdi-view-dashboard", to: "/" },
      { title: "สินค้า", icon: "mdi-image", to: "/inventories" },
      { title: "POS", icon: "mdi-cart", to: "/pos" },
      { title: "Transaction", icon: "mdi-cart", to: "/transaction" },
    ],
  }),
};
</script>

<style>
#app {
  font-family: "Sarabun", sans-serif;
}
</style>
