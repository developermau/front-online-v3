<template>
  <v-container fluid>
    <h1 class="text-center">Carrito de compras</h1>
    <v-layout wrap>
      <v-row>
        <v-col>
          <v-card dark>
            <v-card-title>Productos Añadidos</v-card-title>
            <ProductsInCartList :productos="productsInCart" />
          </v-card>
        </v-col>
        <v-col>
          <DetailsCart />
        </v-col>
      </v-row>
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