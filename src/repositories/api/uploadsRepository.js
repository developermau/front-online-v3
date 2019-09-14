import RepositoryUpload from "../base/RepositoryUpload";

const resource = "/uploads";
export default {
  uploadFile(formData) {
    return RepositoryUpload.post(`${resource}`, formData);
  },
  uploadFileByProducto(pr_producto, formData) {
    return RepositoryUpload.post(`${resource}`, formData);
  },
};
