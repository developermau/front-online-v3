<template>
  <v-container>
    <ProductoCarritoItem
      v-for="producto in productos"
      :producto="producto"
      :key="producto.pr_producto"
    />
  </v-container>
</template>

<script>
import ProductoCarritoItem from "../Producto/ProductoCarritoItem";

export default {
  props: ["productos"],
  name: "CarritoProductoList",
  components: { ProductoCarritoItem }
};
</script>

<style>
</style>