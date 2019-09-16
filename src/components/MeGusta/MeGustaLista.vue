<template>
  <v-list three-line v-if="meGustaList !== null && meGustaList !== undefined">
    <v-list-item v-for="(me_gusta, index) in meGustaList" :key="index">
      <v-list-item-avatar>
        <v-img :src="me_gusta.usuario.us_avatar"></v-img>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title v-text="me_gusta.usuario.us_primer_nombre"></v-list-item-title>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn
          dark
          color="error"
          @click="deleteRelGusta(me_gusta.us_usuario, me_gusta.pr_producto)"
        >X</v-btn>
      </v-list-item-action>
    </v-list-item>
  </v-list>
</template>

<script>
// Repository Factory
import { RepositoryFactory } from "../../repositories/base/RepositoryFactory";
// Repositories
const RelGustaRepository = RepositoryFactory.get("gustas");

export default {
  props: ["meGustaList"],
  name: "MeGustaLista",
  created() {
    console.log("meGustaList", this.meGustaList);
  },
  methods: {
    filterRelGustaByUsuarioAndProducto(usuarioId, productoId, meGustaList) {
      return meGustaList.find(relMeGusta => {
        return (
          relMeGusta.us_usuario === usuarioId &&
          relMeGusta.pr_producto === productoId
        );
      });
    },
    deleteRelGusta(usuarioId, productoId) {
      const relGustaToDelete = this.filterRelGustaByUsuarioAndProducto(
        usuarioId,
        productoId,
        this.meGustaList
      );

      const index = this.meGustaList.indexOf(relGustaToDelete);

      RelGustaRepository.deleteRelation(usuarioId, productoId).then(
        rowsDeleted => {
          console.log("rowsDeleted", rowsDeleted);
          this.meGustaList.splice(index, 1);
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
</style>