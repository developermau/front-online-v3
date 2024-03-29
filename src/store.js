import Vue from "vue";
import Vuex from "vuex";
import cart from "./store/modules/cartStore";
import favorite from "./store/modules/favoriteStore";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    cart,
    favorite
  }
});
