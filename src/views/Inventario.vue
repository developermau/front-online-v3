<template>
  <v-container fluid>
    <h1 class="text-center">Inventario</h1>
    <!-- <v-layout wrap> -->
    <ProductosTable :productos="productos" />
    <!-- </v-layout> -->
  </v-container>
</template>

<script>
// Repository Factory
import { RepositoryFactory } from "../repositories/base/RepositoryFactory";
// Repositories
const ProductosRepository = RepositoryFactory.get("productos");

import ProductosTable from "../components/Inventario/ProductosTable";

export default {
  name: "Inventario",
  components: { ProductosTable },
  data() {
    return {
      isLoading: false,
      productos: []
    };
  },
  created() {
    this.fetchProductos(1);
  },
  methods: {
    async fetchProductos(userId) {
      this.isLoading = true;
      const { data } = await ProductosRepository.get();
      this.isLoading = false;
      this.productos = data;
    }
  }
};
</script>

<style>
</style>