<template>
  <v-app>
    <v-app-bar app color="info" dark>
      <v-toolbar-title class="headline text-uppercase">
        <span>iBuy</span>
        <span class="font-weight-light">Tienda Online</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text to="/">Home</v-btn>
        <v-btn text to="/catalogo">Catálogo</v-btn>
        <v-btn text to="/inventario">Inventario</v-btn>
        <v-btn text to="/login">Ingresar</v-btn>
        <v-btn text to="/register">Registrarse</v-btn>
        <v-btn text to="/carrito">
          <v-badge color="warning">
            <template v-slot:badge>{{countProductsInCart}}</template>
            <v-icon>mdi-cart</v-icon>
          </v-badge>
        </v-btn>
        <v-btn text to="/favoritos">
          <v-badge color="error">
            <template v-slot:badge>{{countProductsInFavorites}}</template>
            <v-icon>mdi-heart</v-icon>
          </v-badge>
        </v-btn>
        <v-btn text to="/about">Acerca</v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
// Repository Factory
import { RepositoryFactory } from "./repositories/base/RepositoryFactory";
// Repositories
const RelGustaRepository = RepositoryFactory.get("gustas");

export default {
  name: "App",
  data() {
    return { productosFavoritos: [] };
  },
  created() {
    const userId = 2;
    this.fetchProductosFavoritosByUser(userId);
  },
  computed: {
    countProductsInCart: function() {
      return this.$store.getters["cart/countProductsInCart"];
    },
    countProductsInFavorites() {
      return this.$store.getters["favorite/countProductsInFavoritos"];
    }
  },
  methods: {
    async fetchProductosFavoritosByUser(userId) {
      console.log("fetchProductosFavoritosByUser....", userId);
      const { data } = await RelGustaRepository.getRelationListByUser(userId);
      this.productosFavoritos = data;

      console.log("this.productosFavoritos", this.productosFavoritos);

      for (let i = 0; i < this.productosFavoritos.length; i++) {
        const productoFavorito = this.productosFavoritos[i];
        this.$store.dispatch(
          "favorite/addProductToFavoritos",
          productoFavorito
        );
      }
    }
  }
};
</script>
