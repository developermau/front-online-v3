import Repository from "../base/Repository";

const resource = "/gustas";
export default {
  get() {
    return Repository.get(`${resource}`);
  },

  getRelationListByUser(userId) {
    return Repository.get(`${resource}/usuarios/${userId}`);
  },

  getRelationListByProducto(productoId) {
    return Repository.get(`${resource}/productos/${productoId}`);
  },

  createRelation(payload) {
    return Repository.post(`${resource}`, payload);
  },

  deleteProducto(payload) {
    return Repository.delete(`${resource}`, { data: payload });
  },
  deleteRelation(usuarioId, productoId) {
    const payload = {
      us_usuario: usuarioId,
      pr_producto: productoId
    };
    return Repository.delete(`${resource}`, { data: payload });
  }
};
