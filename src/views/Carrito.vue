<template>
  <v-container fluid grid-list-sm>
    <h1 class="text-center">Carrito de compras</h1>
    <v-layout wrap>
      <CarritoProductoList :productos="productsInCart" />
    </v-layout>
  </v-container>
</template>

<script>
import CarritoProductoList from "../components/Carrito/CarritoProductoList";

export default {
  name: "Carrito",
  components: { CarritoProductoList },
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