<template>
  <section id="Producto">
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="7">
          <v-card>
            <v-card-text class="text-center">
              <div v-if="hasFotografias" dark>
                <FotografiaCarrusel :fotografias="getFotografias" />
              </div>
              <div v-else>
                <v-icon size="200" color="primary" @click="addFotografia">mdi-camera-plus</v-icon>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <div>
                <v-btn
                  block
                  color="primary"
                  dark
                  @click="openDialogUploadFotografias"
                >Nueva Fotografia</v-btn>
              </div>
              <v-spacer></v-spacer>
              <div>
                <v-btn
                  block
                  color="error"
                  dark
                  @click="openDialogRemoveFotografias"
                >Eliminar Fotografias</v-btn>
              </div>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
          <!-- DIALOG: Remove fotografias -->
          <v-dialog v-model="dialogRemoveFotografias" max-width="500px" persistent>
            <v-card class="mx-auto" max-width="500">
              <v-card-title>Lista de fotografias</v-card-title>
              <v-list shaped>
                <v-list-item-group v-model="fotografiasSelected" multiple>
                  <template v-for="(item, i) in producto.fotografias">
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
          </v-dialog>

          <!-- DIALOG: Upload fotografias -->
          <v-dialog v-model="dialogUploadFotografias" max-width="500px" persistent>
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
                  label="Seleccione las fotografias a subir"
                />
              </v-card-text>

              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="error" @click="dialogUploadFotografias = false">Cancelar</v-btn>
                <v-btn color="success" @click="prepararArchivos">Subir</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
        <v-col cols="5">
          <ProductoCardDetails :producto="producto" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>Opiniones</v-card-title>
            <v-card-text>
              <OpinionesLista :opiniones="producto.opiniones" />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
// Vue components
import FotografiaCarrusel from "../components/Fotografia/FotografiaCarrusel";
import FotografiaListItemGroup from "../components/Fotografia/FotografiaListItemGroup";
import ProductoCardDetails from "../components/Producto/ProductoCardDetails";
import OpinionesLista from "../components/Opiniones/OpinionesLista";

// Repository Factory
import { RepositoryFactory } from "../repositories/base/RepositoryFactory";
// Repositories
const ProductosRepository = RepositoryFactory.get("productos");
const FotografiasRepository = RepositoryFactory.get("fotografias");
const FotografiasUploadsRepository = RepositoryFactory.get("uploadFotografias");

export default {
  props: ["id"],
  name: "Producto",
  components: {
    FotografiaCarrusel,
    FotografiaListItemGroup,
    ProductoCardDetails,
    OpinionesLista
  },
  data: function() {
    return {
      producto: {},
      dialogUploadFotografias: false,
      dialogRemoveFotografias: false,
      fotografias: [],
      fotografiasSelected: []
    };
  },
  // async beforeRouteEnter(to, from, next) {
  //   const { data } = await ProductosRepository.getProducto(to.params.id);
  //   next(vm => (vm.producto = data.data));
  // },
  created() {
    this.fetchProducto(this.id);
  },
  computed: {
    hasFotografias() {
      var result =
        this.producto.fotografias !== null &&
        this.producto.fotografias !== undefined &&
        this.producto.fotografias.length > 0;
      console.log("hasFotografias", result);
      return result;
    },
    getFotografias() {
      return this.producto.fotografias;
    }
  },
  methods: {
    async fetchProducto(productoId) {
      const { data } = await ProductosRepository.getProducto(productoId);
      this.producto = data.data;
    },
    openDialogUploadFotografias() {
      this.fotografias = [];
      this.dialogUploadFotografias = true;
    },
    openDialogRemoveFotografias() {
      this.fotografiasSelected = [];
      this.dialogRemoveFotografias = true;
    },
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
        // Close Dialog
        this.dialogUploadFotografias = false;
      }
    },
    async uploadFilesAsFormDataToServer(formData) {
      const section = "fotografias";
      const pr_producto = this.id;
      const { data } = await FotografiasUploadsRepository.uploadFileByProducto(
        pr_producto,
        formData
      );
      const fotografias = data.fotografias;
      console.log("fotografias", fotografias);

      if (fotografias !== null && fotografias !== undefined) {
        if (
          this.producto.fotografias === null &&
          this.producto.fotografias === undefined
        ) {
          this.producto.fotografias = [];
        }

        fotografias.forEach(fotografia => {
          this.producto.fotografias.push(fotografia);
        });
      }
    },
    eliminar() {
      console.log("Eliminar fotografias...", this.fotografiasSelected);
      console.log("Fotografias actuales", this.producto.fotografias);

      this.fotografiasSelected.forEach(fotografiaToRemove => {
        const index = this.producto.fotografias.indexOf(fotografiaToRemove);
        let fotografiaId = fotografiaToRemove.fo_fotografia;

        FotografiasRepository.deleteFotografia(fotografiaId).then(
          rowsDeleted => {
            console.log("rowsDeleted", rowsDeleted);
            this.producto.fotografias.splice(index, 1);
          }
        );
      });

      this.close();
    },
    close() {
      console.log("Cerrar el dialog");
      this.dialogRemoveFotografias = false;
    }
  }
};
</script>

<style>
</style>