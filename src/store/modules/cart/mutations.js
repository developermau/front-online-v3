const mutations = {
  addProductToState(state, product) {
    console.log("mutation", product);
    state.products.push(product);
  },
  resetState(state) {
    state.products = [];
  },
  removeProductFromState(state, productToRemove) {
    var removeIndex = state.products
      .map(function(product) {
        return product.pr_producto;
      })
      .indexOf(productToRemove.pr_producto);

    // remove object
    state.products.splice(removeIndex, 1);
  },
  updateProductFromState(state, detailProductUpdated) {
    var updateIndex = state.products
      .map(function(product) {
        return product.pr_producto;
      })
      .indexOf(detailProductUpdated.pr_producto);

    if (updateIndex > -1) {
      state.products[updateIndex].cantidad = detailProductUpdated.cantidad;
    } else {
      console.log(
        "No se pudo encontrar el producto en el carrito de compras..."
      );
    }
  }
};

export default mutations;