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
      </v-toolbar-items>
      <v-menu class="hidden-md-and-up">
        <!-- <v-toolbar-side-icon slot="activator"></v-toolbar-side-icon> -->
        <v-list>
          <v-list-tile>
            <v-list-tile-content>
              <v-btn text to="/">Home</v-btn>
            </v-list-tile-content>
            <v-list-tile-content>
              <v-btn text to="/catalogo">Catálogo</v-btn>
            </v-list-tile-content>
            <v-list-tile-content>
              <v-btn text to="/acerca">Acerca</v-btn>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>
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
