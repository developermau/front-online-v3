<template>
  <v-container fluid>
    <h1 class="text-center">Carrito de compras</h1>
    <v-layout wrap>
      <v-flex xs8>
        <ProductsInCartList :productos="productsInCart" />
      </v-flex>
      <v-flex xs4>
        <DetailsCart />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ProductsInCartList from "../components/Carrito/ProductsInCartList";
import DetailsCart from "../components/Carrito/DetailsCart";

export default {
  name: "Carrito",
  components: { ProductsInCartList, DetailsCart },
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