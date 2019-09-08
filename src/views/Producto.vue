<template>
  <section id="Producto">
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="7">
          <v-card v-if="hasFotografias" dark>
            <v-card-text class="text-center">
              <FotografiaCarrusel :fotografias="producto.fotografias" />
            </v-card-text>
          </v-card>
          <v-card v-else dark>
            <v-card-text class="text-center">
              <v-icon size="200" color="primary" @click="addFotografia">mdi-camera-plus</v-icon>
            </v-card-text>
            <v-card-actions>
              <!-- DIALOG: Fotografia -->
              <v-dialog v-model="dialogFotografia" max-width="500px" persistent>
                <template v-slot:activator="{ on }">
                  <v-btn block color="primary" dark v-on="on">Nueva Fotografia</v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">Subir fotografias</span>
                  </v-card-title>

                  <v-card-text>
                    <v-file-input
                      v-model="files"
                      color="deep-purple accent-4"
                      counter
                      label="File input"
                      multiple
                      placeholder="Select your files"
                      prepend-icon="mdi-paperclip"
                      outlined
                      :show-size="1000"
                    >
                      <template v-slot:selection="{ index, text }">
                        <v-chip
                          v-if="index < 2"
                          color="deep-purple accent-4"
                          dark
                          label
                          small
                        >{{ text }}</v-chip>

                        <span
                          v-else-if="index === 2"
                          class="overline grey--text text--darken-3 mx-2"
                        >+{{ files.length - 2 }} File(s)</span>
                      </template>
                    </v-file-input>
                  </v-card-text>

                  <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn color="blue darken-1" text @click="dialogFotografia = false">Cancelar</v-btn>
                    <v-btn color="blue darken-1" text @click="uploadFiles">Subir</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="5">
          <ProductoCardDetails :producto="producto" />
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
// Vue components
import FotografiaCarrusel from "../components/Fotografia/FotografiaCarrusel";
import ProductoCardDetails from "../components/Producto/ProductoCardDetails";
// Repository Factory
import { RepositoryFactory } from "../repositories/base/RepositoryFactory";
// Repositories
const ProductosRepository = RepositoryFactory.get("productos");

export default {
  props: ["id"],
  name: "Producto",
  components: { FotografiaCarrusel, ProductoCardDetails },
  data: function() {
    return {
      producto: {},
      dialogFotografia: false,
      files: []
    };
  },
  async beforeRouteEnter(to, from, next) {
    const { data } = await ProductosRepository.getProducto(to.params.id);
    next(vm => (vm.producto = data.data));
  },
  computed: {
    hasFotografias() {
      var result =
        this.producto.fotografias !== null &&
        this.producto.fotografias !== undefined &&
        this.producto.fotografias.length > 0;
      console.log("hasFotografias", result);
      return result;
    }
  },
  methods: {
    addFotografia() {
      console.log("Adicionando fotografias...para el producto", this.producto);
    },
    uploadFiles() {
      console.log("uploading....", this.files);
      this.dialogFotografia = false;
    }
  }
};
</script>

<style>
</style>