<template>
  <v-list-item>
    <template v-slot:default="{ active, toggle }">
      <v-btn text @click="removeProductFromCart">
        <v-icon>mdi-cart-remove</v-icon>
      </v-btn>
      <v-list-item-content>
        <v-list-item-title v-text="producto.pr_nombre"></v-list-item-title>
        <v-list-item-subtitle class="text--primary" v-text="producto.pr_marca"></v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-text-field
          v-model="producto.cantidad"
          label="Cantidad"
          max="9999"
          min="-9999"
          step="1"
          style="width: 125px"
          type="number"
          @keydown="false"
        ></v-text-field>
      </v-list-item-action>
      <v-list-item-action>
        <v-list-item-title>
          <h4 class="text-center">{{totalByProduct}} Bs.</h4>
        </v-list-item-title>
      </v-list-item-action>
    </template>
  </v-list-item>
</template>

<script>
export default {
  props: ["producto"],
  name: "ProductoListItem",
  data() {
    return {
      total: 0
    };
  },
  methods: {
    removeProductFromCart() {
      this.$store.dispatch("cart/removeProduct", this.producto);
    },
    changeQuantity() {
      let productUpdated = { ...this.producto, cantidad: this.cantidad };
    }
  },
  watch: {
    "producto.cantidad": function(newCantidad, oldCantidad) {
      if (this.producto !== null && this.producto !== undefined) {
        // watch it
        this.total = this.producto.pr_precio_bs * newCantidad;

        // Vuex: actions
        let detailProductUpdated = {
          pr_producto: this.producto.pr_producto,
          cantidad: newCantidad
        };

        this.$store.dispatch(
          "cart/updateCantidadByProducto",
          detailProductUpdated
        );
      } else {
        console.error("Error: el producto es invalido...");
      }
    }
  },
  computed: {
    firstPhotography() {
      let fotografia = {};
      let fotografias = this.producto.fotografias;

      if (fotografias !== null && fotografias !== undefined) {
        if (Array.isArray(fotografias)) {
          if (fotografias.length > 0) {
            fotografia = fotografias[0].fo_ubicacion;
          }
        }
      }

      return fotografia;
    },
    totalByProduct() {
      return this.producto.cantidad * this.producto.pr_precio_bs;
    }
  }
};
</script>

<style>
</style>