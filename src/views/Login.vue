<template>
  <section id="Login">
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <LoginForm />
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import LoginForm from "../components/Forms/LoginForm";

export default {
  name: "Login",
  components: { LoginForm }
};
</script>

<style>
</style>