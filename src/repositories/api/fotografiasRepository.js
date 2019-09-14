import Repository from "../base/Repository";

const resource = "/fotografias";
export default {
  get() {
    return Repository.get(`${resource}`);
  },

  getFotografia(fotografiaId) {
    return Repository.get(`${resource}/${fotografiaId}`);
  },

  createFotografia(payload) {
    return Repository.post(`${resource}`, payload);
  },

  deleteFotografia(fotografiaId) {
    return Repository.delete(`${resource}/${fotografiaId}`);
  },

  updateFotografia(fotografiaId, payload) {
    return Repository.put(`${resource}/${fotografiaId}`, payload);
  },
};
