<template>
  <v-list three-line v-if="opiniones !== null && opiniones !== undefined">
    <v-list-item v-for="(opinion, index) in opiniones" :key="index">
      <v-list-item-avatar>
        <v-img :src="opinion.usuario.us_avatar"></v-img>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title v-text="opinion.op_texto"></v-list-item-title>
        <v-list-item-subtitle v-text="opinion.usuario.us_primer_nombre"></v-list-item-subtitle>
        <v-rating v-model="opinion.op_calificacion"></v-rating>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn dark color="error" @click="deleteOpinion(opinion.op_opinion)">X</v-btn>
      </v-list-item-action>
    </v-list-item>
  </v-list>
</template>

<script>
// Repository Factory
import { RepositoryFactory } from "../../repositories/base/RepositoryFactory";
// Repositories
const OpinionesRepository = RepositoryFactory.get("opiniones");

export default {
  props: ["opiniones"],
  name: "OpinionesLista",
  methods: {
    filterOpinionById(opinionId, opiniones) {
      return opiniones.find(opinion => {
        return opinion.op_opinion === opinionId;
      });
    },
    deleteOpinion(opinionId) {
      console.log("opinionId", opinionId);

      const opinion = this.filterOpinionById(opinionId, this.opiniones);

      const index = this.opiniones.indexOf(opinion);
      this.removeOpinionDBById(index, opinionId);
    },
    removeOpinionDBById(index, opinionId) {
      OpinionesRepository.deleteOpinion(opinionId).then(rowsDeleted => {
        console.log("rowsDeleted", rowsDeleted);
        this.opiniones.splice(index, 1);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>