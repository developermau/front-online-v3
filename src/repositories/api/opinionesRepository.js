import Repository from "../base/Repository";

const resource = "/opiniones";
export default {
  get() {
    return Repository.get(`${resource}`);
  },

  getOpinion(opinionId) {
    return Repository.get(`${resource}/${opinionId}`);
  },

  createOpinion(payload) {
    return Repository.post(`${resource}`, payload);
  },

  deleteOpinion(opinionId) {
    return Repository.delete(`${resource}/${opinionId}`);
  },

  updateOpinion(opinionId, payload) {
    return Repository.put(`${resource}/${opinionId}`, payload);
  },
};
