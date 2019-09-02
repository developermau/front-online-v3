<template>
  <v-container>
    <h1 class="text-center">{{categoria.ca_nombre}}</h1>
    <v-card>
      <ProductoList :productos="categoria.productos" />
    </v-card>
  </v-container>
</template>

<script>
// Vue components
import ProductoList from "../components/Producto/ProductoList";
// Repository Factory
import { RepositoryFactory } from "../repositories/base/RepositoryFactory";
// Repositories
const CategoriasRepository = RepositoryFactory.get("categorias");

export default {
  props: ["id"],
  name: "Categoria",
  components: { ProductoList },
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