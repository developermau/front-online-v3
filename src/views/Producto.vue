<template>
  <section id="Producto">
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="7">
          <v-card v-if="hasFotografias" dark>
            <v-card-text class="text-center">
              <FotografiaCarrusel :fotografias="producto.fotografias" />
            </v-card-text>
          </v-card>
          <v-card v-else dark>
            <v-card-text class="text-center">
              <v-icon size="200" color="primary" @click="addFotografia">mdi-camera-plus</v-icon>
            </v-card-text>
          </v-card>
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
  },
  computed: {
    hasFotografias() {
      var result =
        this.producto.fotografias !== null &&
        this.producto.fotografias !== undefined &&
        this.producto.fotografias.length > 0;
      console.log("hasFotografias", result);
      return result;
    }
  },
  methods: {
    addFotografia() {
      console.log("Adicionando fotografias...para el producto", this.producto);
    }
  }
};
</script>

<style>
</style>