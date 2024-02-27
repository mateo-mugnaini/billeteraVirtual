// walletController.js
const { Wallet } = require("../db");

const createWallet = async (req, res, next) => {
  const { userId } = req.body;

  try {
    // Verificar que el campo userId esté presente
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    // Verificar si ya existe una wallet para este usuario
    const existingWallet = await Wallet.findOne({ where: { userId } });

    if (existingWallet) {
      return res
        .status(400)
        .json({ message: "Wallet already exists for this user" });
    }

    const newWallet = await Wallet.create({
      userId,
    });

    res.status(201).json(newWallet);
  } catch (error) {
    // Manejar errores específicos de Sequelize
    if (error instanceof require("sequelize").ValidationError) {
      // Puedes personalizar el mensaje de acuerdo a tus necesidades
      res
        .status(400)
        .json({ message: "Validation error. Please check your input." });
    } else {
      next(error);
    }
  }
};

const getWalletByUserId = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const wallet = await Wallet.findOne({ where: { userId } });

    if (wallet) {
      res.json(wallet);
    } else {
      res.status(404).json({ message: "Wallet not found" });
    }
  } catch (error) {
    next(error);
  }
};

const updateWallet = async (req, res, next) => {
  const { userId } = req.params;
  const { saldo } = req.body;

  try {
    const wallet = await Wallet.findOne({ where: { userId } });

    if (wallet) {
      // Actualizar el saldo de la wallet
      wallet.saldo = saldo || wallet.saldo;
      await wallet.save();
      res.json(wallet);
    } else {
      res.status(404).json({ message: "Wallet not found" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createWallet,
  getWalletByUserId,
  updateWallet,
};
