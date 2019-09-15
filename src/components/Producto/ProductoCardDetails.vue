<template>
  <v-card>
    <v-card-title>{{producto.pr_nombre}}</v-card-title>
    <v-card-text>{{producto.pr_descripcion}}</v-card-text>
    <v-card-actions>
      <v-btn dark color="success" @click="addToCart">Añadir al carrito</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
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
    }
  }
};
</script>

<style>
</style>