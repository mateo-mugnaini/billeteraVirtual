// routes/movimientosRoutes.js
const { Router } = require("express");
const movementController = require("../controllers/movementController");

const router = Router();

router.post("/", movementController.createMovimiento);
router.get("/:walletId", movementController.getMovementByWalletId);

module.exports = router;
