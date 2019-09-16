<template>
  <v-list three-line>
    <v-list-item v-for="(opinion, index) in opiniones" :key="index">
      <v-list-item-avatar>
        <v-img :src="opinion.usuario.us_avatar"></v-img>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title v-text="opinion.op_texto"></v-list-item-title>
        <v-list-item-subtitle v-text="opinion.usuario.us_primer_nombre"></v-list-item-subtitle>
        <v-rating v-model="opinion.op_calificacion"></v-rating>
      </v-list-item-content>

      <v-list-item-icon>
        <v-btn>X</v-btn>
      </v-list-item-icon>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  props: ["opiniones"],
  name: "OpinionesLista",
  methods: {
    deleteOpinion(opinionId) {
      console.log("opinionId", opinionId);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>