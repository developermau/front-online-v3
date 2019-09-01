import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";

// Routes: Usuario
import usuarioRoute from "./router/routes/usuarioRoute";

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
  ...usuarioRoute
];
console.log("routes", routes);

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
