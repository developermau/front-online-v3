import Repository from "../base/Repository";

const resource = "/productos";
export default {
  get() {
    return Repository.get(`${resource}`);
  },

  getProducto(productoId) {
    return Repository.get(`${resource}/${productoId}`);
  },

  createProducto(payload) {
    return Repository.post(`${resource}`, payload);
  }
};
