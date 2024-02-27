// routes/index.js
const { Router } = require("express");
const userRouter = require("./userRoutes.js");
const walletRouter = require("./walletRoutes.js"); // Agrega esta línea
const movementRoutes = require("./movementRoutes.js"); // Agrega esta línea

const router = Router();

// Configurar los routers
router.use("/users", userRouter);
router.use("/wallets", walletRouter); // Agrega esta línea
router.use("/movement", movementRoutes); // Agrega esta línea

module.exports = router;
