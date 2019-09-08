import Repository from "../base/Repository";

const resource = "/proveedores";
export default {
  get() {
    return Repository.get(`${resource}`);
  },

  getProveedor(proveedorId) {
    return Repository.get(`${resource}/${proveedorId}`);
  },

  createProveedor(payload) {
    return Repository.post(`${resource}`, payload);
  }
};
