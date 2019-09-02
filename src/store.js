import Vue from "vue";
import Vuex from "vuex";
import cart from "./store/modules/cartStore";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    cart
  }
});
