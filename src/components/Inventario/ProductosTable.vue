<template>
  <v-data-table :headers="headers" :items="productos" sort-by="calories" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Lista de productos</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <div class="flex-grow-1"></div>
        <!-- DIALOG: Item -->
        <v-dialog v-model="dialogItem" max-width="500px" persistent>
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">Nuevo Producto</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-select
                      v-model="selected.categoria"
                      :items="categorias"
                      item-text="ca_nombre"
                      item-value="ca_categoria"
                      label="Categorias"
                      return-object
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select
                      v-model="selected.proveedor"
                      :items="proveedores"
                      item-text="pr_nombre"
                      item-value="pr_proveedor"
                      label="Proveedores"
                      return-object
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="editedItem.pr_marca" label="Marca" required></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="editedItem.pr_nombre" label="Nombre" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="editedItem.pr_stock"
                      label="Stock"
                      type="number"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="editedItem.pr_year" label="Año" type="number" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="editedItem.pr_precio_bs"
                      label="Precio (en Bs.)"
                      type="number"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="editedItem.pr_precio_envio_bs"
                      label="Precio envio (en Bs.)"
                      type="number"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      name="input-7-1"
                      label="Descripcion"
                      v-model="editedItem.pr_descripcion"
                      required
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn color="blue darken-1" text @click="closeDialogItem">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="save">Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- MODAL: Confirmation -->
        <v-dialog dark color="error" v-model="dialogConfirm" persistent max-width="290">
          <v-card>
            <v-card-title class="headline">Confirmación de eliminacion</v-card-title>
            <v-card-text>
              ¿Esta seguro de eliminar el producto
              <b>{{editedItem.pr_nombre}}</b>?
            </v-card-text>
            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn color="error" dark @click="dialogConfirm = false">No</v-btn>
              <v-btn color="success" dark @click="deleteItem(deletedItem)">Si</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- MODAL: Proveedor -->
        <v-dialog dark color="warning" v-model="dialogCallProveedor" persistent max-width="290">
          <v-card>
            <v-card-title class="headline">Contactarse con el proveedor</v-card-title>
            <v-card-text>
              Llamar al
              <b>{{proveedorByItem.pr_telefono}}</b>
              por pedidos
            </v-card-text>
            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn color="error" dark @click="dialogCallProveedor = false">Cerrar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.pr_stock="{ item }">
      <v-chip :color="getColor(item.pr_stock)" dark>{{ item.pr_stock }}</v-chip>
    </template>
    <template v-slot:body.append>
      <tr>
        <td>
          <v-text-field v-model="searchItem.categoria.ca_nombre" type="text" label="Contiene"></v-text-field>
        </td>
        <td>
          <v-text-field v-model="searchItem.pr_nombre" type="text" label="Contiene"></v-text-field>
        </td>
        <td>
          <v-text-field v-model="searchItem.pr_marca" type="text" label="Contiene"></v-text-field>
        </td>
        <td>
          <v-text-field v-model="searchItem.pr_stock" type="number" label="Menor que"></v-text-field>
        </td>
        <td>
          <v-text-field v-model="searchItem.proveedor.pr_nombre" type="text" label="Contiene"></v-text-field>
        </td>
        <td colspan="2"></td>
      </tr>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon size="20px" @click="showProduct(item)">mdi-eye</v-icon>
      <v-icon size="20px" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon size="20px" @click="openModal(item)">mdi-delete</v-icon>
      <v-icon size="20px" @click="callProveedor(item)">mdi-phone</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="fetchAllProductos">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
// Repository Factory
import { RepositoryFactory } from "../../repositories/base/RepositoryFactory";
// Repositories
const ProductosRepository = RepositoryFactory.get("productos");
const CategoriasRepository = RepositoryFactory.get("categorias");
const ProveedoresRepository = RepositoryFactory.get("proveedores");

export default {
  data: () => ({
    dialogItem: false,
    dialogConfirm: false,
    dialogCallProveedor: false,
    productos: [],
    categorias: [],
    proveedores: [],
    editedIndex: -1,
    selected: {
      categoria: {},
      proveedor: {}
    },
    editedItem: {
      pr_nombre: "",
      pr_marca: "",
      pr_stock: 0,
      pr_precio_bs: 0,
      pr_precio_envio_bs: 0,
      pr_year: new Date().getFullYear(),
      ca_categoria: 0,
      pr_proveedor: 0
    },
    deletedItem: {
      pr_nombre: "",
      pr_marca: "",
      pr_stock: 0,
      pr_precio_bs: 0,
      pr_precio_envio_bs: 0,
      pr_year: new Date().getFullYear(),
      ca_categoria: 0,
      pr_proveedor: 0
    },
    defaultItem: {
      pr_nombre: "",
      pr_marca: "",
      pr_stock: 0,
      pr_precio_bs: 0,
      pr_precio_envio_bs: 0,
      pr_year: new Date().getFullYear(),
      ca_categoria: 0,
      pr_proveedor: 0
    },
    searchItem: {
      pr_nombre: "",
      pr_marca: "",
      pr_stock: 0,
      pr_precio_bs: 0,
      pr_precio_envio_bs: 0,
      pr_year: new Date().getFullYear(),
      categoria: {
        ca_categoria: 0,
        ca_nombre: ""
      },
      proveedor: {
        pr_proveedor: 0,
        pr_nombre: ""
      }
    },
    proveedorByItem: {},
    isLoading: false
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Producto" : "Actualizar Producto";
    },
    headers() {
      return [
        {
          text: "Categoria",
          align: "left",
          sortable: true,
          value: "categoria.ca_nombre",
          width: "1%",
          filter: value => {
            if (!this.searchItem.categoria.ca_nombre) return true;
            return value.includes(this.searchItem.categoria.ca_nombre);
          }
        },
        {
          text: "Nombre",
          align: "left",
          sortable: true,
          value: "pr_nombre",
          width: "1%",
          filter: value => {
            if (!this.searchItem.pr_nombre) return true;
            return value.includes(this.searchItem.pr_nombre);
          }
        },
        {
          text: "Marca",
          align: "left",
          sortable: true,
          value: "pr_marca",
          width: "1%",
          filter: value => {
            if (!this.searchItem.pr_marca) return true;
            return value.includes(this.searchItem.pr_marca);
          }
        },
        {
          text: "Stock",
          align: "left",
          sortable: true,
          value: "pr_stock",
          width: "1%",
          filter: value => {
            if (!this.searchItem.pr_stock) return true;
            return value < parseInt(this.searchItem.pr_stock);
          }
        },
        {
          text: "Proveedor",
          align: "left",
          sortable: true,
          value: "proveedor.pr_nombre",
          width: "1%",
          filter: value => {
            if (!this.searchItem.proveedor.pr_nombre) return true;
            return value.includes(this.searchItem.proveedor.pr_nombre);
          }
        },
        { text: "Actions", value: "action", width: "2%", sortable: false }
      ];
    }
  },

  watch: {
    dialogItem(val) {
      if (val) {
        // Dialog is opened
        this.fetchAllCategorias();
        this.fetchAllProveedores();
      }

      val || this.closeDialogItem();
    }
  },

  created() {
    this.fetchAllProductos();
  },

  methods: {
    async fetchAllProductos() {
      this.isLoading = true;
      const { data } = await ProductosRepository.get();
      this.isLoading = false;
      this.productos = data;
    },
    async fetchAllCategorias() {
      this.isLoading = true;
      const { data } = await CategoriasRepository.get();
      this.isLoading = false;
      this.categorias = data;
    },
    async fetchAllProveedores() {
      this.isLoading = true;
      const { data } = await ProveedoresRepository.get();
      this.isLoading = false;
      this.proveedores = data;
    },
    async saveItemDB(item) {
      const itemProducto = { ...item };

      itemProducto.ca_categoria = this.selected.categoria.ca_categoria;
      itemProducto.pr_proveedor = this.selected.proveedor.pr_proveedor;

      const { data } = await ProductosRepository.createProducto(itemProducto);
      // Build product
      const productoNuevo = { ...data.data };
      productoNuevo.categoria = {
        ca_nombre: this.selected.categoria.ca_nombre
      };
      productoNuevo.proveedor = {
        pr_nombre: this.selected.proveedor.pr_nombre
      };
      console.log("productoNuevo", productoNuevo);
      this.productos.push(productoNuevo);
      this.selected = { categoria: {}, proveedor: {} };
    },
    async deleteItem(item) {
      console.log("delete...", item);
      const index = this.productos.indexOf(item);

      try {
        const { data } = await ProductosRepository.deleteProducto(
          item.pr_producto
        );
        this.productos.splice(index, 1);
        this.dialogConfirm = false;
      } catch (error) {
        console.log("Ocurrio un error", error);
      }
    },
    async updateItemDB(indexTable, id, payload) {
      try {
        const itemProducto = { ...payload };

        itemProducto.ca_categoria = this.selected.categoria.ca_categoria;
        itemProducto.pr_proveedor = this.selected.proveedor.pr_proveedor;

        const { data } = await ProductosRepository.updateProducto(
          itemProducto.pr_producto,
          itemProducto
        );

        console.log("data", data);

        if (data.data.rowsUpdated > 0) {
          // Build product
          const productoUpdated = { ...itemProducto };
          productoUpdated.categoria = {
            ca_nombre: this.selected.categoria.ca_nombre
          };
          productoUpdated.proveedor = {
            pr_nombre: this.selected.proveedor.pr_nombre
          };
          console.log("productoUpdated", productoUpdated);
          // update tabla
          Object.assign(this.productos[indexTable], this.editedItem);
        } else {
          console.error("No se pudo actualizar el registro");
        }

        this.selected = { categoria: {}, proveedor: {} };
      } catch (error) {
        console.error(error);
      }
    },
    save() {
      if (this.editedIndex > -1) {
        this.isLoading = true;
        this.updateItemDB(
          this.editedIndex,
          this.editedItem.pr_producto,
          this.editedItem
        );
        this.isLoading = false;
      } else {
        this.isLoading = true;
        // Save
        this.saveItemDB(this.editedItem);
        this.isLoading = false;
      }
      this.closeDialogItem();
    },
    editItem(item) {
      console.log("editItem", item);
      this.editedIndex = this.productos.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.selected.categoria = {
        ca_categoria: item.ca_categoria
      };
      this.selected.proveedor = {
        pr_proveedor: item.pr_proveedor
      };
      this.dialogItem = true;
    },
    callProveedor(item) {
      console.log("calling...", item);
      this.proveedorByItem = item.proveedor;
      this.dialogCallProveedor = true;
    },
    openModal(item) {
      console.log("item", item);
      this.dialogConfirm = true;
      this.deletedItem = Object.assign({}, item);
    },
    closeDialogItem() {
      this.dialogItem = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    getColor(pr_stock) {
      if (pr_stock < 10) return "red";
      else if (pr_stock >= 10 && pr_stock <= 20) return "orange";
      else if (pr_stock > 20) return "green";
    },
    showProduct(item) {
      // -> /producto/123
      const productoId = item.pr_producto;
      this.$router.push({ name: "producto", params: { id: productoId } });
    }
  }
};
</script>