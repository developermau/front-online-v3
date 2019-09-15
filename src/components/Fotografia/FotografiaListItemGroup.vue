<template>
  <v-card class="mx-auto" max-width="500">
    <v-card-title>Lista de fotografias</v-card-title>
    <v-list shaped>
      <v-list-item-group v-model="fotografiasSelected" multiple>
        <template v-for="(item, i) in fotografias">
          <v-divider v-if="!item" :key="`divider-${i}`"></v-divider>

          <v-list-item
            v-else
            :key="`item-${i}`"
            :value="item"
            active-class="deep-purple--text text--accent-4"
          >
            <template v-slot:default="{ active, toggle }">
              <v-avatar>
                <img size="10" :src="item.fo_ubicacion" alt="avatar" />
              </v-avatar>
              <v-list-item-content>
                <v-list-item-title v-text="item.fo_title"></v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                <v-checkbox
                  :input-value="active"
                  :true-value="item"
                  color="deep-purple accent-4"
                  @click="toggle"
                ></v-checkbox>
              </v-list-item-action>
            </template>
          </v-list-item>
        </template>
      </v-list-item-group>
    </v-list>
    <v-card-actions>
      <v-spacer></v-spacer>
      <div>
        <v-btn small color="error" @click="eliminar">Eliminar</v-btn>
      </div>
      <v-spacer></v-spacer>
      <div>
        <v-btn small color="danger" @click="close">Cancelar</v-btn>
      </div>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ["fotografias"],
  data: () => ({
    fotografiasSelected: []
  }),
  methods: {
    eliminar() {
      console.log("Eliminar fotografias...", this.fotografiasSelected);
      this.close();
    },
    close() {
      console.log("Cerrar el dialog");
    }
  }
};
</script>

<style>
</style>