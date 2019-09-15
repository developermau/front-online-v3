const getters = {
  productsInFavoritos(state) {
    return state.favoritosProducts;
  },
  countProductsInFavoritos(state) {
    return state.favoritosProducts.length;
  },
  totalFavoritosInBs(state) {
    var initialValue = 0;
    return state.favoritosProducts.reduce(function(accumulator, currentProduct) {
      return (
        accumulator + currentProduct.pr_precio_bs * currentProduct.cantidad
      );
    }, initialValue);
  }
};

export default getters;
