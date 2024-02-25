// ./routes/index.js
const { Router } = require("express");
const userRouter = require("./userRoutes.js");

const router = Router();

// Configurar los routers
router.use("/users", userRouter);

module.exports = router;
