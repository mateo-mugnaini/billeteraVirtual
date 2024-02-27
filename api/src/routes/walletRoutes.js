// routes/walletRoutes.js
const { Router } = require("express");
const walletController = require("../controllers/walletController");

const router = Router();

router.post("/", walletController.createWallet);
router.get("/:userId", walletController.getWalletByUserId);
router.put("/:userId", walletController.updateWallet);

module.exports = router;
