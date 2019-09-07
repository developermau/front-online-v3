<template>
  <v-card dark color="secondary">
    <v-row align="center" justify="center">
      <v-col cols="3">
        <v-img
          src="https://picsum.photos/id/11/500/300"
          lazy-src="https://picsum.photos/id/11/10/6"
          aspect-ratio="1"
          class="grey lighten-2"
          max-width="500"
          max-height="300"
        ></v-img>
      </v-col>
      <v-col cols="9">
        <v-card-text>
          <h3>{{producto.pr_nombre}}</h3>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-icon color="primary accent-4" @click="showProduct">mdi-eye</v-icon>
          <v-spacer></v-spacer>
          <v-icon color="primary accent-4" @click="addToCart">mdi-cart</v-icon>
          <v-spacer></v-spacer>
          <v-icon color="primary accent-4" @click="addToFavorites">mdi-heart</v-icon>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: ["producto"],
  name: "ProductoListItem",
  methods: {
    showProduct() {
      // -> /producto/123
      const productoId = this.producto.pr_producto;
      this.$router.push({ name: "producto", params: { id: productoId } });
    },
    addToCart() {
      let productInCart = {
        ...this.producto,
        cantidad: 1
      };
      this.$store.dispatch("cart/addProductToCart", productInCart);
    },
    addToFavorites() {
      console.log("Añadiendo a favoritos...", this.product);
    }
  }
};
</script>

<style>
</style>