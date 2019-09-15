<template>
  <v-container fluid>
    <v-data-iterator
      :items="favoritos"
      :items-per-page.sync="itemsPerPage"
      :page="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar dark color="blue darken-3" class="mb-1">
          <v-text-field
            v-model="search"
            clearable
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-magnify"
            label="Search"
          ></v-text-field>
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <div class="flex-grow-1"></div>
            <v-select
              v-model="sortBy"
              flat
              solo-inverted
              hide-details
              :items="keys"
              prepend-inner-icon="mdi-magnify"
              label="Ordenar por"
            ></v-select>
            <div class="flex-grow-1"></div>
            <v-btn-toggle v-model="sortDesc" mandatory>
              <v-btn large depressed color="blue" :value="false">
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn large depressed color="blue" :value="true">
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </template>
        </v-toolbar>
      </template>

      <template v-slot:default="props">
        <v-row>
          <v-col v-for="(item, index) in props.items" :key="index" cols="12" sm="6" md="4" lg="3">
            <v-card>
              <v-card-title class="subheading font-weight-bold">{{ item.nombre }}</v-card-title>

              <v-divider></v-divider>

              <v-list dense>
                <v-list-item
                  v-for="(key, index) in filteredKeys"
                  :key="index"
                  :color="sortBy === key ? `blue lighten-4` : `white`"
                >
                  <v-list-item-content
                    v-if="key.toLowerCase()=='costo' 
                    || key.toLowerCase()=='envio'"
                  >{{ key }} (en Bs):</v-list-item-content>
                  <v-list-item-content v-else>{{ key }}:</v-list-item-content>
                  <v-list-item-content class="align-end">{{ item[key.toLowerCase()] }}</v-list-item-content>
                </v-list-item>
              </v-list>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-icon color="primary accent-4" @click="showProduct(item.id)">mdi-eye</v-icon>
                <v-spacer></v-spacer>
                <v-icon color="primary accent-4" @click="addToCart(item.id)">mdi-cart</v-icon>
                <v-spacer></v-spacer>
                <v-icon color="primary accent-4" @click="removeToFavorites(item.id)">mdi-delete</v-icon>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-row class="mt-2" align="center" justify="center">
          <span class="grey--text">Productos por página</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn dark text color="primary" class="ml-2" v-on="on">
                {{ itemsPerPage }}
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(number, index) in itemsPerPageArray"
                :key="index"
                @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <div class="flex-grow-1"></div>

          <span class="mr-4 grey--text">Pagina {{ page }} de {{ numberOfPages }}</span>
          <v-btn fab dark color="blue darken-3" class="mr-1" @click="formerPage">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab dark color="blue darken-3" class="ml-1" @click="nextPage">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
// Repository Factory
import { RepositoryFactory } from "../../repositories/base/RepositoryFactory";
// Repositories
const RelGustaRepository = RepositoryFactory.get("gustas");

export default {
  data() {
    return {
      itemsPerPageArray: [3, 6, 9],
      search: "",
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 3,
      sortBy: "name",
      keys: ["Nombre", "Marca", "Stock", "Año", "Costo", "Envio"],
      favoritosDB: [],
      favoriteProducts: []
    };
  },
  created() {
    const userId = 2;
    this.fetchFavoriteProductsByUser(userId);
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.favoritos.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter(key => key !== `Name`);
    },
    favoritos() {
      let favoritos = [];

      this.favoritosDB.forEach(favoritoDB => {
        favoritos.push(this.mapperProductDBToProductDataIterator(favoritoDB));
      });
      return favoritos;
    }
  },
  methods: {
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
    async fetchFavoriteProductsByUser(userId) {
      this.isLoading = true;
      const { data } = await RelGustaRepository.getRelationListByUser(userId);

      if (this.favoritosDB === null && this.favoritosDB === undefined) {
        this.favoritosDB = [];
      }

      if (data !== null && data !== undefined) {
        data.forEach(item => {
          const producto = item.producto;
          this.favoritosDB.push(producto);
        });
      }

      this.isLoading = false;
    },
    showProduct(productoId) {
      this.$router.push({
        name: "producto",
        params: {
          id: productoId
        }
      });
    },
    addToCart(productoId) {
      const producto = this.filterProductoById(productoId, this.favoritosDB);

      let productInCart = {
        ...producto,
        cantidad: 1
      };
      console.log("productInCart", productInCart);
      this.$store.dispatch("cart/addProductToCart", productInCart);
    },
    removeToFavorites(productoId) {
      const producto = this.filterProductoById(productoId, this.favoritosDB);
      // console.log("Eliminando de favoritos...", producto);

      const index = this.favoritosDB.indexOf(producto);

      const usuarioId = 2;

      const payload = {
        us_usuario: usuarioId,
        pr_producto: productoId
      };

      this.removeRelacionGusta(index, payload);
      this.$store.dispatch("favorite/removeProduct", producto);
    },
    removeRelacionGusta(index, payload) {
      console.log("payload", payload);
      RelGustaRepository.deleteProducto(payload).then(rowsDeleted => {
        console.log("rowsDeleted", rowsDeleted);
        this.favoritosDB.splice(index, 1);
      });
    },
    filterProductoById(productoId, productos) {
      return productos.find(producto => {
        return producto.pr_producto === productoId;
      });
    },
    mapperProductDataIteratorToProductDB(producto) {
      return {
        pr_producto: producto.pr_producto,
        pr_nombre: producto.pr_nombre,
        pr_descripcion: producto.pr_descripcion,
        pr_marca: producto.pr_marca,
        pr_precio_bs: producto.pr_precio_bs,
        pr_precio_envio_bs: producto.pr_precio_envio_bs,
        pr_stock: producto.pr_stock,
        pr_year: producto.pr_year,
        pr_estado: producto.pr_estado,
        ca_categoria: producto.ca_categoria,
        pr_proveedor: producto.pr_proveedor,
        createdAt: producto.createdAt,
        updatedAt: producto.updatedAt
      };
    },
    mapperProductDBToProductDataIterator(producto) {
      return {
        id: producto.pr_producto,
        nombre: producto.pr_nombre,
        descripcion: producto.pr_descripcion,
        marca: producto.pr_marca,
        costo: producto.pr_precio_bs,
        envio: producto.pr_precio_envio_bs,
        stock: producto.pr_stock,
        año: producto.pr_year,
        estado: producto.pr_estado,
        categoria: producto.ca_categoria,
        proveedor: producto.pr_proveedor,
        createdAt: producto.createdAt,
        updatedAt: producto.updatedAt
      };
    }
  }
};
</script>

<style>
</style>