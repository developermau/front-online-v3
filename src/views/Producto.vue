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
                      v-model="fotografias"
                      id="fotografias"
                      name="fotografias"
                      accept="image/png, image/jpeg, image/bmp"
                      multiple
                      chips
                      prepend-icon="mdi-camera"
                      color="secondary"
                      label="Select Photos to Upload"
                    />
                  </v-card-text>

                  <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn color="blue darken-1" text @click="dialogFotografia = false">Cancelar</v-btn>
                    <v-btn color="blue darken-1" text @click="prepararArchivos">Subir</v-btn>
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
const FotografiasUploadsRepository = RepositoryFactory.get("uploadFotografias");

export default {
  props: ["id"],
  name: "Producto",
  components: { FotografiaCarrusel, ProductoCardDetails },
  data: function() {
    return {
      producto: {},
      dialogFotografia: false,
      fotografias: []
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
    prepararArchivos(event) {
      console.log("preparing....", this.fotografias);

      if (this.fotografias.length > 0) {
        let formData = new FormData();
        this.fotografias.forEach(fotografia => {
          formData.append("fotografias", fotografia);
        });
        this.uploadFilesAsFormDataToServer(formData);
      }
    },
    async uploadFilesAsFormDataToServer(formData) {
      const section = "fotografias";
      const pr_producto = this.id;
      const { data } = await FotografiasUploadsRepository.uploadFileByProducto(
        pr_producto,
        formData
      );

      console.log(data);

      // Close Dialog
      this.dialogFotografia = false;
    }
  }
};
</script>

<style>
</style>