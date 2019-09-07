<template>
  <v-list two-line>
    <v-list-item-group v-model="selected" multiple active-class="pink--text">
      <ProductoCarrito v-for="(product, index) in productos" :key="index" :producto="product">
        <v-divider v-if="index + 1 < productos.length" :key="index"></v-divider>
      </ProductoCarrito>
    </v-list-item-group>
  </v-list>
</template>

<script>
import ProductoCarrito from "../Producto/ProductoCarrito";

export default {
  props: ["productos"],
  name: "CarritoProductoList",
  components: { ProductoCarrito },
  data() {
    return {
      selected: [1]
    };
  },
  created(){
    console.log(this.productos);
  }

};
</script>

<style>
</style>