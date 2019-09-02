<template>
  <v-flex xs4>
    <v-card max-width="344" class="mx-auto">
      <v-list-item>
        <v-list-item-avatar color="grey"></v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="headline">{{producto.pr_nombre}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <!-- <v-img
        :src="primeraFotografia"
        :lazy-src="primeraFotografia"
        aspect-ratio="1"
        class="grey lighten-2"
        height="194"
      >
        <template v-slot:placeholder>
          <v-layout fill-height align-center justify-center ma-0>
            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
          </v-layout>
        </template>
      </v-img>-->

      <v-card-text>{{producto.pr_descripcion}}</v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-icon color="deep-purple accent-4" @click="showProduct">mdi-eye</v-icon>
        <v-spacer></v-spacer>
        <v-icon color="deep-purple accent-4" @click="addToCart">mdi-cart</v-icon>
        <v-spacer></v-spacer>
        <v-icon color="deep-purple accent-4" @click="addToFavorites">mdi-heart</v-icon>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  props: ["producto"],
  name: "ProductoCard",
  methods: {
    showProduct() {
      // -> /producto/123
      const productoId = this.producto.pr_producto;
      this.$router.push({ name: "producto", params: { id: productoId } });
    },
    addToCart() {
      let productInCart = {
        ...this.product,
        cantidad: 1
      };
    },
    addToFavorites() {
      console.log("Añadiendo a favoritos...", this.product);
    }
  }
};
</script>

<style>
</style>