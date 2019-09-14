import Repository from "../base/Repository";

const resource = "/uploads";
export default {
  uploadFile(section, payload) {
    return Repository.post(`${resource}/${section}`, payload);
  },
};
