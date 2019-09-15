const mutations = {
  addProductToState(state, product) {
    state.favoritosProducts.push(product);
  },
  resetState(state) {
    state.favoritosProducts = [];
  },
  removeProductFromState(state, productToRemove) {
    var removeIndex = state.favoritosProducts
      .map(function(product) {
        return product.pr_producto;
      })
      .indexOf(productToRemove.pr_producto);

    // remove object
    state.favoritosProducts.splice(removeIndex, 1);
  },
  updateProductFromState(state, detailProductUpdated) {
    var updateIndex = state.favoritosProducts
      .map(function(product) {
        return product.pr_producto;
      })
      .indexOf(detailProductUpdated.pr_producto);

    if (updateIndex > -1) {
      state.favoritosProducts[updateIndex].cantidad =
        detailProductUpdated.cantidad;
    } else {
      console.log("No se pudo encontrar el producto favorito...");
    }
  }
};

export default mutations;
