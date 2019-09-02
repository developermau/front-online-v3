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
        <v-btn text to="/acerca">Acerca</v-btn>
        <v-btn text to="/login">Ingresar</v-btn>
        <v-btn text to="/register">Registrarse</v-btn>
      </v-toolbar-items>      
    </v-app-bar>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App"
};
</script>
