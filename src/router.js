import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";

// Routes: Usuario
import usuarioRoute from "./router/routes/usuarioRoute";
// Routes: Catalogo
import catalogoRoute from "./router/routes/catalogoRoute";
// Routes: Producto
import productoRoute from "./router/routes/productoRoute";
// Routes: Carrito
import carritoRoute from "./router/routes/carritoRoute";
// Routes: Favoritos
import favoritoRoute from "./router/routes/favoritoRoute";
// Routes: Inventario
import inventarioRoute from "./router/routes/inventarioRoute";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    component: About
  },
  ...usuarioRoute,
  ...catalogoRoute,
  ...productoRoute,
  ...carritoRoute,
  ...favoritoRoute,
  ...inventarioRoute
];

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
