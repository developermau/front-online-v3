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
    const userId = 2;
    this.fetchFavoriteProductsByUser(userId);
  },
  methods: {
    async fetchFavoriteProductsByUser(userId) {
      this.isLoading = true;
      const { data } = await RelGustaRepository.getRelationListByUser(userId);

      if (
        this.favoriteProducts === null &&
        this.favoriteProducts === undefined
      ) {
        this.favoriteProducts = [];
      }

      if (data !== null && data !== undefined) {
        data.forEach(item => {
          console.log(item);
          console.log(item.producto);

          const producto = item.producto;

          const productoConvertToDataIterator = this.convertProductoToDataIterator(
            producto
          );

          this.favoriteProducts.push(productoConvertToDataIterator);
        });
      }

      this.isLoading = false;
    },
    convertProductoToDataIterator(producto) {
      return {
        producto: producto.pr_producto,
        nombre: producto.pr_nombre,
        descripcion: producto.pr_descripcion,
        marca: producto.pr_marca,
        precio_bs: producto.pr_precio_bs,
        precio_envio_bs: producto.pr_precio_envio_bs,
        stock: producto.pr_stock,
        year: producto.pr_year,
        estado: producto.pr_estado,
        categoria: producto.ca_categoria,
        proveedor: producto.pr_proveedor,
        createdAt: producto.createdAt,
        updatedAt: producto.updatedAt
      };
    }
  }
};
</script>

<style>
</style>