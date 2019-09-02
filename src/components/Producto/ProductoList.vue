<template>
  <v-container>
    <ProductoListItem
      v-for="producto in productos"
      :producto="producto"
      :key="producto.pr_producto"
    />
    <v-spacer></v-spacer>
  </v-container>
</template>

<script>
import ProductoListItem from "../Producto/ProductoListItem";

export default {
  props: ["productos"],
  name: "ProductoList",
  components: { ProductoListItem }
};
</script>

<style>
</style>