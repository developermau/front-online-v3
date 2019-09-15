<template>
  <div>
    <v-list three-line>
      <template v-for="(opinion, index) in opiniones" v-key="index">
        <v-subheader v-if="opinion.header" :key="opinion.header" v-text="opinion.header"></v-subheader>

        <!-- <v-divider v-else-if="opinion.divider" :key="index" :inset="opinion.inset"></v-divider> -->

        <v-list-item v-else :key="opinion.op_opinion">
          <v-list-item-avatar>
            <v-img :src="opinion.usuario.us_avatar"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{opinion.usuario.us_primer_nombre}} {{opinion.usuario.us_segundo_nombre}} {{opinion.usuario.us_paterno_apellido}}</v-list-item-title>
            <v-list-item-subtitle v-html="opinion.op_texto"></v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-rating v-model="opinion.op_calificacion"></v-rating>
          </v-list-item-action>
        </v-list-item>
        <v-divider :key="index"></v-divider>
      </template>
    </v-list>
  </div>
</template>

<script>
export default {
  props: ["opiniones"],
  name: "OpinionesLista"
};
</script>

<style lang="scss" scoped>
</style>