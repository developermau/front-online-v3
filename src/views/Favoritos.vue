<template>
  <v-container fluid>
    <h1 class="text-center">Favoritos</h1>
    <!-- <v-layout wrap> -->
    <FavoritosDataIterator :favoritosDB="favoriteProducts" />
    <!-- </v-layout> -->
  </v-container>
</template>

<script>
// Repository Factory
import { RepositoryFactory } from "../repositories/base/RepositoryFactory";
// Repositories
const RelGustaRepository = RepositoryFactory.get("gustas");

import FavoritosDataIterator from "../components/Favoritos/FavoritosDataIterator";

export default {
  name: "Favoritos",
  components: { FavoritosDataIterator },
  data() {
    return {
      isLoading: false,
      favoriteProducts: []
    };
  },
  created() {
    const userId = 2;
    this.fetchFavoriteProductsByUser(userId);
  },
  methods: {
    async fetchFavoriteProductsByUser(userId) {
      this.isLoading = true;
      const { data } = await RelGustaRepository.getRelationListByUser(userId);

      if (
        this.favoriteProducts === null &&
        this.favoriteProducts === undefined
      ) {
        this.favoriteProducts = [];
      }

      if (data !== null && data !== undefined) {
        data.forEach(item => {
          const producto = item.producto;
          this.favoriteProducts.push(producto);
        });
      }

      this.isLoading = false;
    }
  }
};
</script>

<style>
</style>