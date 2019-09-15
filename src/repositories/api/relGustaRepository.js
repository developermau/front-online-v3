import Repository from "../base/Repository";

const resource = "/gustas";
export default {
  get() {
    return Repository.get(`${resource}`);
  },

  getRelationListByUser(userId) {
    return Repository.get(`${resource}/usuarios/${userId}`);
  },

  createRelation(payload) {
    return Repository.post(`${resource}`, payload);
  },

  deleteProducto(payload) {
    return Repository.delete(`${resource}`, { data: payload });
  }
};
