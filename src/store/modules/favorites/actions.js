const actions = {
  addProductToFavoritos({ commit }, product) {
    commit("addProductToState", product);
  },
  resetFavoritos({ commit }) {
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
