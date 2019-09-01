import axios from "axios";

const port = 9090;
const baseDomain = `http://localhost:${port}`;
const versionAPI = "v1";
// The base URL
const baseURL = `${baseDomain}/api/${versionAPI}/`;

export default axios.create({
  baseURL
});
