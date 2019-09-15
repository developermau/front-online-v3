<template>
  <v-container>
    <h1 class="text-center">{{categoria.ca_nombre}}</h1>
    <v-card>
      <ProductosDataIterator :categoriaId="id" />
    </v-card>
  </v-container>
</template>

<script>
// Vue components
import ProductosDataIterator from "../components/Producto/ProductosDataIterator";
// Repository Factory
import { RepositoryFactory } from "../repositories/base/RepositoryFactory";
// Repositories
const CategoriasRepository = RepositoryFactory.get("categorias");

export default {
  props: ["id"],
  name: "Categoria",
  components: { ProductosDataIterator },
  data: function() {
    return {
      categoria: {}
    };
  },
  async beforeRouteEnter(to, from, next) {
    const { data } = await CategoriasRepository.getCategoria(to.params.id);
    next(vm => (vm.categoria = data.data));
  }
};
</script>

<style>
</style>