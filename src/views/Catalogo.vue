<template>
  <v-container fluid grid-list-sm>
    <h1 class="text-center">Catálogo</h1>
    <v-layout wrap>
      <v-card id="Categoria" class="mx-auto">
        <v-card-text>
          <Categoria
            v-for="categoria in categorias"
            :categoria="categoria"
            :key="categoria.ca_categoria"
          />
        </v-card-text>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
// Vue components
import Categoria from "../components/Catalogo/Categoria";

// Repository Factory
import { RepositoryFactory } from "../repositories/base/RepositoryFactory";
// Repositories
const CategoriasRepository = RepositoryFactory.get("categorias");

export default {
  name: "Catalogo",
  components: { Categoria },
  data() {
    return {
      isLoading: false,
      categorias: []
    };
  },
  created() {
    this.fetchCategorias();
  },
  methods: {
    async fetchCategorias() {
      this.isLoading = true;
      const { data } = await CategoriasRepository.get();
      this.isLoading = false;
      this.categorias = data;
    }
  }
};
</script>

<style>
</style>