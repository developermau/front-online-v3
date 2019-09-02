import Repository from "../base/Repository";

const resource = "/categorias";
export default {
  get() {
    return Repository.get(`${resource}`);
  },

  getCategoria(categoriaId) {
    return Repository.get(`${resource}/${categoriaId}`);
  },

  getProductosByCategoria(categoriaId) {
    return Repository.get(`${resource}/${categoriaId}/productos`);
  },

  createCategoria(payload) {
    return Repository.post(`${resource}`, payload);
  }
};
