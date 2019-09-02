<template>
  <v-carousel>
    <v-carousel-item v-for="color in colors" :key="color">
      <v-sheet :color="color" height="100%" tile>
        <v-row class="fill-height" align="center" justify="center">
          <div class="display-3">Slide</div>
        </v-row>
      </v-sheet>
    </v-carousel-item>
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