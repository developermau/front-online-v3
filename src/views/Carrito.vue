<template>
  <v-container fluid>
    <h1 class="text-center">Carrito de compras</h1>
    <v-layout wrap>
      <v-flex xs8>
        <ProductsInCartList :productos="productsInCart" />
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex xs4>
        <ProductsInCartList :productos="productsInCart" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ProductsInCartList from "../components/Carrito/ProductsInCartList";

export default {
  name: "Carrito",
  components: { ProductsInCartList },
  data() {
    return {
      productsInCart: []
    };
  },
  created() {
    this.getAllProductsInStore();
  },
  methods: {
    getAllProductsInStore() {
      // Vuex: getters
      this.productsInCart = this.$store.getters["cart/productsInCart"];
    },
    resetCart() {
      this.$store.dispatch("cart/resetCart");
    }
  }
};
</script>

<style>
</style>