<template>
  <section id="Producto">
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="7">
          <!-- <v-img
            src="https://picsum.photos/id/11/500/300"
            lazy-src="https://picsum.photos/id/11/10/6"
            aspect-ratio="1"
            class="grey lighten-2"
            max-width="500"
            max-height="300"
          ></v-img>-->
          <FotografiaCarrusel :fotografias="producto.fotografias" />
        </v-col>
        <v-col cols="5">
          <ProductoCardDetails :producto="producto" />
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
// Vue components
import FotografiaCarrusel from "../components/Fotografia/FotografiaCarrusel";
import ProductoCardDetails from "../components/Producto/ProductoCardDetails";
// Repository Factory
import { RepositoryFactory } from "../repositories/base/RepositoryFactory";
// Repositories
const ProductosRepository = RepositoryFactory.get("productos");

export default {
  props: ["id"],
  name: "Producto",
  components: { FotografiaCarrusel, ProductoCardDetails },
  data: function() {
    return {
      producto: {}
    };
  },
  async beforeRouteEnter(to, from, next) {
    const { data } = await ProductosRepository.getProducto(to.params.id);
    next(vm => (vm.producto = data.data));
  }
};
</script>

<style>
</style>