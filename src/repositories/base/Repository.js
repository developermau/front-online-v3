import axios from "axios";

import { HOST, PORT  } from "../../config/backendServerConfig";
const baseDomain = `http://${HOST}:${PORT}`;

const versionAPI = "v1";
// The base URL
const baseURL = `${baseDomain}/api/${versionAPI}/`;

export default axios.create({
  baseURL
});
