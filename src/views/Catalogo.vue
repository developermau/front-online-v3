<template>
  <section id="Catalogo"></section>
</template>

<script>
import { RepositoryFactory } from "../repositories/base/RepositoryFactory";
const ProductosRepository = RepositoryFactory.get("productos");

export default {
  name: "Catalogo",
  data() {
    return {
      isLoading: false,
      productos: []
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      this.isLoading = true;
      const { data } = await ProductosRepository.get();
      this.isLoading = false;
      this.productos = data;
    }
  },
  computed: {
    computedproductos() {
      return this.productos.slice(0, 10);
    }
  }
};
</script>

<style>
</style>