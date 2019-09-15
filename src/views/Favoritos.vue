<template>
  <v-container fluid>
    <h1 class="text-center">Favoritos</h1>
    <!-- <v-layout wrap> -->
    <FavoritosDataIterator />
    <!-- </v-layout> -->
  </v-container>
</template>

<script>
import FavoritosDataIterator from "../components/Favoritos/FavoritosDataIterator";

export default {
  name: "Favoritos",
  components: { FavoritosDataIterator }
};
</script>

<style>
</style>