<template>
  <v-data-table :headers="headers" :items="productos" :search="search">
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
                    <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.pr_stock" label="pr_stock"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
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
    <template v-slot:body.append>
      <tr>
        <td></td>
        <td>
          <v-text-field v-model="pr_stock" type="number" label="Less than"></v-text-field>
        </td>
        <td>
          <v-text-field v-model="fat" type="number" label="Less than"></v-text-field>
        </td>
        <td colspan="3"></td>
      </tr>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
      <v-icon small @click="deleteItem(item)">delete</v-icon>
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

export default {
  data() {
    return {
      productos: [],
      dialog: false,
      search: "",
      // Filters
      pr_stock: "",
      fat: "",
      editedIndex: -1,
      editedItem: {
        name: "",
        pr_stock: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      },
      defaultItem: {
        name: "",
        pr_stock: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      }
    };
  },
  created() {
    this.fetchAllProductos();
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    headers() {
      return [
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
        }
      ];
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  methods: {
    async fetchAllProductos() {
      this.isLoading = true;
      const { data } = await ProductosRepository.get();
      this.isLoading = false;
      this.productos = data;
    },
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
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
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
    getColor (pr_stock) {
        if (pr_stock < 10) return 'red'
        else if (pr_stock >= 10 && pr_stock <= 20) return 'orange'
        else if (pr_stock > 20) return 'green'
      },
  }
};
</script>

<style>
</style>