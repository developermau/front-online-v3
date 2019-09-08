<template>
  <v-data-table :headers="headers" :items="productos" sort-by="calories" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>My CRUD</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <div class="flex-grow-1"></div>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.pr_nombre" label="Dessert name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.pr_marca" label="Calories"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.pr_stock" label="Carbs (g)"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.pr_stock="{ item }">
      <v-chip :color="getColor(item.pr_stock)" dark>{{ item.pr_stock }}</v-chip>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
// Repository Factory
import { RepositoryFactory } from "../../repositories/base/RepositoryFactory";
// Repositories
const ProductosRepository = RepositoryFactory.get("productos");

export default {
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "Nombre",
        align: "left",
        sortable: true,
        value: "pr_nombre"
      },
      {
        text: "Marca",
        align: "left",
        sortable: true,
        value: "pr_marca"
      },
      {
        text: "Stock",
        align: "left",
        sortable: true,
        value: "pr_stock"
      },
      { text: "Actions", value: "action", sortable: false }
    ],
    productos: [],
    editedIndex: -1,
    editedItem: {
      pr_nombre: "",
      pr_marca: "",
      pr_stock: 0
    },
    defaultItem: {
      pr_nombre: "",
      pr_marca: "",
      pr_stock: 0
    },
    searchItem: {
      pr_nombre: "",
      pr_marca: "",
      pr_stock: 0
    },
    isLoading: false
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    async initialize() {
      this.isLoading = true;
      const { data } = await ProductosRepository.get();
      this.isLoading = false;
      this.productos = data;
    },

    editItem(item) {
      this.editedIndex = this.productos.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.productos.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.productos.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.productos[this.editedIndex], this.editedItem);
      } else {
        this.productos.push(this.editedItem);
      }
      this.close();
    },
    getColor(pr_stock) {
      if (pr_stock < 10) return "red";
      else if (pr_stock >= 10 && pr_stock <= 20) return "orange";
      else if (pr_stock > 20) return "green";
    }
  }
};
</script>