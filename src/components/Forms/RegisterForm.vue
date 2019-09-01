<template>
  <v-card class="elevation-12">
    <v-toolbar color="info" dark>
      <v-toolbar-title>Registro</v-toolbar-title>
    </v-toolbar>

    <v-card-text>
      <v-form id="RegisterForm">
        <v-text-field
          type="text"
          v-model="usuario.us_username"
          label="Usuario"
          :rules="[rules.required]"
          error
        ></v-text-field>
        <v-text-field
          :type="show1 ? 'text' : 'password'"
          v-model="usuario.us_password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required]"
          name="input-10-2"
          label="Contraseña"
          hint="Al menos 8 caracteres"
          error
          @click:append="show1 = !show1"
        ></v-text-field>
        <v-text-field
          type="text"
          v-model="usuario.us_email"
          label="Correo Electronico"
          :rules="[rules.required]"
          error
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <div class="my-2">
        <v-btn depressed large color="success" @click="register">Registrarse</v-btn>
      </div>
      <v-spacer></v-spacer>
      <div class="my-2">
        <v-btn depressed large color="error" @click="reset">Limpiar</v-btn>
      </div>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "RegisterForm",
  data: function() {
    return {
      usuario: {
        us_username: "",
        us_password: "",
        us_email: ""
      },
      // form
      show1: false,
      rules: {
        required: value => !!value || "Requerido.",
        min: v => v.length >= 8 || "Minimo 8 caracteres"
      }
    };
  },
  methods: {
    register: function() {},
    reset: function() {
      this.usuario = {};
    }
  }
};
</script>

<style>
</style>