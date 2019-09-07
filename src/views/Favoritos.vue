<template>
  <v-container fluid>
    <h1 class="text-center">Favoritos</h1>
    <!-- <v-layout wrap> -->
        <FavoritosTable :productos="productsInCart" />
    <!-- </v-layout> -->
  </v-container>
</template>

<script>
import FavoritosTable from "../components/Favoritos/FavoritosTable";

export default {
  name: "Favoritos",
  components: { FavoritosTable },
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