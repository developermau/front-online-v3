<template>
  <v-card id="Categoria" class="mx-auto">
    <v-toolbar color="info" dark>
      <v-toolbar-title>{{categoria.ca_nombre}}</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-container fluid grid-list-sm>
        <v-layout wrap>
          <ProductoCard
            v-for="producto in computedProductosByCategory"
            :producto="producto"
            :key="producto.pr_producto"
          />
        </v-layout>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-btn
        class="text-center"
        color="secondary"
        @click="verMasCategoria(categoria.ca_categoria)"
      >Ver mas</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
// Vue components
import ProductoCard from "../Producto/ProductoCard";

// Repository Factory
import { RepositoryFactory } from "../../repositories/base/RepositoryFactory";
// Repositories
const ProductosRepository = RepositoryFactory.get("productos");

export default {
  props: ["categoria"],
  name: "Categoria",
  components: { ProductoCard },
  data() {
    return {
      isLoading: false,
      productosByCategory: []
    };
  },
  created() {
    this.fetchProductosByCategoria(this.categoria.ca_categoria);
  },
  methods: {
    async fetchProductosByCategoria(categoriaId) {
      this.isLoading = true;
      const { data } = await ProductosRepository.get();
      this.isLoading = false;
      this.productosByCategory = data;
    },
    verMasCategoria(categoriaId) {
      this.$router.push(`/categoria/${categoriaId}`);
    }
  },
  computed: {
    computedProductosByCategory() {
      return this.productosByCategory.slice(0, 3);
    }
  }
};
</script>

<style>
</style>