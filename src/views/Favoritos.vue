<template>
  <v-container fluid>
    <h1 class="text-center">Favoritos</h1>
    <!-- <v-layout wrap> -->
    <FavoritosTable :favoritos="favoriteProducts" />
    <!-- </v-layout> -->
  </v-container>
</template>

<script>
// Repository Factory
import { RepositoryFactory } from "../repositories/base/RepositoryFactory";
// Repositories
const RelGustaRepository = RepositoryFactory.get("gustas");

import FavoritosTable from "../components/Favoritos/FavoritosTable";

export default {
  name: "Favoritos",
  components: { FavoritosTable },
  data() {
    return {
      isLoading: false,
      favoriteProducts: []
    };
  },
  created() {
    this.fetchFavoriteProductsByUser(1);
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