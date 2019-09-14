import RepositoryUpload from "../base/RepositoryUpload";

const resource = "/uploads";
export default {
  uploadFile(section, formData) {
    return RepositoryUpload.post(`${resource}/${section}`, formData);
  },
};
