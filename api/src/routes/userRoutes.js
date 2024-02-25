const { Router } = require("express");
const userController = require("../controllers/userController");
const authenticateMiddleware = require("../middlewares/authenticate.js");

const router = Router();

// No aplicar el middleware de autenticación para la ruta de login
router.post("/login", userController.login);
router.get("/", userController.getAllUsers);
router.get("/:userId", userController.getUserById);
router.post("/", userController.createUser);
router.put("/:userId", userController.updateUser);
router.patch("/:userId", userController.updateUser);
router.delete("/:userId", userController.deleteUser);

module.exports = router;
