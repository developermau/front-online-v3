// Guard
import { yourGuard } from "./../guard";
// Component
import Catalogo from "../../views/Catalogo";
import Categoria from "../../views/Categoria";

export default [
  {
    path: "/catalogo",
    name: "catalogo",
    component: Catalogo
  },
  {
    path: "/categoria/:id",
    name: "categoria",
    component: Categoria,
    props: true
  }
  // .. and so one
];
