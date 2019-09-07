<template>
  <section id="About">
    <v-btn text href="https://materialdesignicons.com/">Mas iconos</v-btn>
    <v-container>
      <span v-for="(iconName, index) in iconList" :key="index">
        <v-icon>{{index}}. {{iconName}}</v-icon> |
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
        "mdi-eye",
        "mdi-eye-off",
        "mdi-anchor",
        "mdi-xbox-controller",
        "mdi-watch",
        "mdi-tilde",
        "mdi-tennis",
        "mdi-mouse",
        "mdi-pencil",
        "mdi-delete",
        "mdi-eye",
        "mdi-heart",
        "mdi-cart",
        "mdi-cart-remove",
        "mdi-email",
        "mdi-cellphone",
        "mdi-laptop",
        "mdi-laptop",
        "mdi-television-classic",
        "mdi-magnify"
      ];
    }
  }
};
</script>

<style>
</style>