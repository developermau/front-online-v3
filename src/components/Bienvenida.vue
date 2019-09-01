<template>
  <v-container>
    <v-layout text-center wrap>
      <v-flex xs12>
        <v-icon size="200" color="primary">mdi-cart</v-icon>
      </v-flex>

      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3">Bienvenido a iBuy</h1>
        <p
          class="subheading font-weight-regular"
        >Tu Tienda Online favorita, donde encontraras los mejores productos en tecnología.</p>
      </v-flex>
      <v-flex xs12 wrap>
        <v-btn class="ma-2" rounded color="success" dark to="/register">Registrarse</v-btn>
        <v-btn class="ma-2" rounded color="primary" dark to="/login">Ingresar</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Bienvenida"
};
</script>

<style>
</style>