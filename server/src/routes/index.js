const router = require("express").Router();
const authRoutes = require("./auth.routes");
const taskRoutes = require("./task.routes");

const defaultRoutes = [
  {
    path: "/user/auth",
    routes: authRoutes,
  },
  {
    path: "/",
    routes: taskRoutes,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.routes);
});

module.exports = router;
