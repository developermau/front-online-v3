import Repository from "../base/Repository";

const resource = "/productos";
export default {
  get() {
    return Repository.get(`${resource}`);
  },

  getPost(postId) {
    return Repository.get(`${resource}/${postId}`);
  },

  createPost(payload) {
    return Repository.post(`${resource}`, payload);
  }
};
