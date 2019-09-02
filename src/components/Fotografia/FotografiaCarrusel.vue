<template>
  <v-carousel progress>
    <v-carousel-item
      v-for="fotografia in fotografias"
      :key="fotografia.fo_fotografia"
      :src="fotografia.fo_ubicacion"
    ></v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  props: ["fotografias"],
  name: "FotografiaCarrusel",
  data() {
    return {
      colors: ["primary", "secondary", "yellow darken-2", "red", "orange"]
    };
  }
};
</script>

<style>
</style>