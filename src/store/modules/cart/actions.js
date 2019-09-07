const actions = {
  addProductToCart({ commit }, product) {
    commit("addProductToState", product);
  },
  resetCart({ commit }) {
    commit("resetState");
  },
  removeProduct({ commit }, product) {
    commit("removeProductFromState", product);
  },
  updateCantidadByProducto({ commit }, detailProductUpdated) {
    commit("updateProductFromState", detailProductUpdated);
  }
};

export default actions;
