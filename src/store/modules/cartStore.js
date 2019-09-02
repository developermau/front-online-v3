// Store functionality
import actions from "./cart/actions";
import getters from "./cart/getters";
import mutations from "./cart/mutations";
import state from "./cart/state";

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
