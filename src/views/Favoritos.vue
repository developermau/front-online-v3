<template>
  <v-container fluid>
    <h1 class="text-center">Favoritos</h1>
    <!-- <v-layout wrap> -->
    <FavoritosDataIterator :favoritos="favoriteProducts" />
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
    const userId = 1;
    this.fetchFavoriteProductsByUser(userId);
  },
  methods: {
    async fetchFavoriteProductsByUser(userId) {
      this.isLoading = true;
      const { data } = await RelGustaRepository.getRelationListByUser(userId);
      this.isLoading = false;
      this.favoriteProducts = data;
    }
  }
};
</script>

<style>
</style>