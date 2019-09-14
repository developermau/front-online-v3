import axios from "axios";

import { HOST, PORT  } from "../../config/backendServerConfig";
const baseDomain = `http://${HOST}:${PORT}`;

const versionAPI = "v1";
// The base URL
const baseURL = `${baseDomain}/api/${versionAPI}/`;
// headers files
const headers = {
  "Content-Type": "multipart/form-data"
};

export default axios.create({
  baseURL,
  headers
});
