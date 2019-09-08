<template>
  <section id="About">
    <v-btn text href="https://materialdesignicons.com/">Mas iconos</v-btn>
    <v-container>
      <span v-for="(icon, index) in iconList" :key="index">
        <v-icon>{{index}}. {{icon.name}}</v-icon>
        {{icon.name}}
        <v-spacer></v-spacer>
      </span>
    </v-container>
  </section>
</template>

<script>
export default {
  name: "About",
  data() {
    return {
      iconList: []
    };
  },
  created() {
    this.fetchIcons();
  },
  methods: {
    fetchIcons() {
      this.iconList = [
        { name: "mdi-eye" },
        { name: "mdi-eye-off" },
        { name: "mdi-anchor" },
        { name: "mdi-xbox-controller" },
        { name: "mdi-watch" },
        { name: "mdi-tilde" },
        { name: "mdi-tennis" },
        { name: "mdi-mouse" },
        { name: "mdi-pencil" },
        { name: "mdi-delete" },
        { name: "mdi-eye" },
        { name: "mdi-heart" },
        { name: "mdi-cart" },
        { name: "mdi-cart-remove" },
        { name: "mdi-email" },
        { name: "mdi-cellphone" },
        { name: "mdi-laptop" },
        { name: "mdi-phone" },
        { name: "mdi-television-classic" },
        { name: "mdi-magnify" },
        { name: "mdi-camera-plus" }
      ];
    }
  }
};
</script>

<style>
</style>