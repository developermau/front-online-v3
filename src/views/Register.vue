<template>
  <section id="Register">
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <RegisterForm />
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import RegisterForm from "../components/Forms/RegisterForm";

export default {
  name: "Register",
  components: { RegisterForm }
};
</script>

<style>
</style>