<template>
  <div id="CardTitle">
    <v-card-title>
      {{ title }}
      <v-spacer></v-spacer>
      <v-btn :to="{ path: '/inventories/create' }" color="primary" elevation="2"
        >{{ button }}
      </v-btn>
    </v-card-title>
    <v-card-subtitle>
      {{ subtitle }}
    </v-card-subtitle>
  </div>
</template>

<script>
export default {
  name: "CardTitle",
  props: ["title", "subtitle", "button"],
};
</script>

<style scoped></style>
