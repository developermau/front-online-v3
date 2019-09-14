import RepositoryUpload from "../base/RepositoryUpload";

const resource = "/fotografias";
export default {
  uploadFileByProducto(pr_producto, formData) {
    return RepositoryUpload.post(`${resource}/${pr_producto}/uploads`, formData);
  }
};
