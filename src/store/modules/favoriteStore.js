// Store functionality
import actions from "./favorites/actions";
import getters from "./favorites/getters";
import mutations from "./favorites/mutations";
import state from "./favorites/state";

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
