const getters = {
  productsInCart(state) {
    return state.products;
  },
  countProductsInCart(state) {
    return state.products.length;
  },
  totalCartInBs(state) {
    var initialValue = 0;
    return state.products.reduce(function(accumulator, currentProduct) {
      return (
        accumulator + currentProduct.pr_precio_bs * currentProduct.cantidad
      );
    }, initialValue);
  }
};

export default getters;
