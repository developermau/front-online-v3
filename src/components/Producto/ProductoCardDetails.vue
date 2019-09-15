<template>
  <v-card>
    <v-card-title>{{producto.pr_nombre}}</v-card-title>
    <v-card-text>{{producto.pr_descripcion}}</v-card-text>
    <v-card-actions>
      <v-btn dark color="success" @click="addToCart">Añadir al carrito</v-btn>
      <v-btn dark color="info" @click="addToFavorites">Añadir a favoritos</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
// Repository Factory
import { RepositoryFactory } from "../../repositories/base/RepositoryFactory";
// Repositories
const RelGustaRepository = RepositoryFactory.get("gustas");

export default {
  props: ["producto"],
  name: "ProductoCardDetails",
  methods: {
    addToCart() {
      let productInCart = {
        ...this.producto,
        cantidad: 1
      };
      this.$store.dispatch("cart/addProductToCart", productInCart);
    },
    async addToFavorites() {
      console.log("Añadiendo a favoritos...", this.producto);

      const usuarioId = 2;

      const newRelGusta = {
        us_usuario: usuarioId,
        pr_producto: this.producto.pr_producto
      };

      console.log("newRelGusta", newRelGusta);

      console.log("newRelGusta", newRelGusta);
      const { data } = await RelGustaRepository.createRelation(newRelGusta);
      console.log("data", data);

      // Vuex
      this.$store.dispatch("favorite/addProductToFavoritos", this.producto);
    }
  }
};
</script>

<style>
</style>