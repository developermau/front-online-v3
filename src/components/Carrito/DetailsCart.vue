<template>
  <v-card dark color="error">
    <v-card-title>
      <h2 class="display-1">Total</h2>
      <v-spacer></v-spacer>
      <span class="title">Bs. {{totalCartInBs}}</span>
    </v-card-title>

    <v-card-text>Para terminar la orden complete la transaccion.</v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-actions>
      <v-btn block dark color="success" @click="completeTransaction">Completar la transaccion</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "DetailsCart",
  data() {
    return {
      totalCart: 0
    };
  },
  computed: {
    totalCartInBs() {
      return this.$store.getters["cart/totalCartInBs"];
    }
  },
  methods: {
    completeTransaction() {
      this.$router.push("checkout");
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  background-color: rgb(147, 212, 26);
}

.transaction__total {
  font-size: 5em;
}
</style>
