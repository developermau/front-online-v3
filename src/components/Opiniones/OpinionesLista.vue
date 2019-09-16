<template>
  <v-list three-line>
    <v-list-item v-for="opinion in opiniones" :key="opinion.op_opinion">
      <v-list-item-avatar>
        <v-img :src="opinion.usuario.us_avatar"></v-img>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title v-text="opinion.op_texto"></v-list-item-title>
        <v-list-item-subtitle v-text="opinion.usuario.us_primer_nombre"></v-list-item-subtitle>
        <v-rating v-model="opinion.op_calificacion"></v-rating>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn dark color="error">X</v-btn>
      </v-list-item-action>
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