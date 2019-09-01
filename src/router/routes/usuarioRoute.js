// Guard
import { yourGuard } from "./../guard";
// Component
import Login from "../../views/Login";
import Register from "../../views/Register";

export default [
  {
    path: "/login",
    component: Login
  },
  {
    path: "/register",
    component: Register
  }
  // .. and so one
];
