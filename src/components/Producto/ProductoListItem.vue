<template>
  <v-card dark color="primary">
    <v-row align="center" justify="center">
      <v-col cols="3">
        <v-img
          src="https://picsum.photos/id/11/500/300"
          lazy-src="https://picsum.photos/id/11/10/6"
          aspect-ratio="1"
          class="grey lighten-2"
          max-width="500"
          max-height="300"
        ></v-img>
      </v-col>
      <v-col cols="9">
        <h3>{{producto.pr_nombre}}</h3>
      </v-col>
    </v-row>
    <v-spacer></v-spacer>
  </v-card>
</template>

<script>
export default {
  props: ["producto"],
  name: "ProductoListItem"
};
</script>

<style>
</style>