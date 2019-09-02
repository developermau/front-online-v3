// Guard
import { yourGuard } from "../guard";
// Component
import Producto from "../../views/Producto.vue";

export default [
  {
    path: "/producto/:id",
    name: "producto",
    component: Producto,
    props: true
  }
  // .. and so one
];
