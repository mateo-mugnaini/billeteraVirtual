// movementController.js
const { Movement, Wallet } = require("../db");
const Decimal = require("decimal.js");

const createMovimiento = async (req, res, next) => {
  const { walletId, tipo, monto, motivo } = req.body;

  try {
    if (!walletId || !tipo || !monto || !motivo) {
      return res
        .status(400)
        .json({ message: "walletId, tipo, and monto are required" });
    }

    const newMovimiento = await Movement.create({
      walletId,
      tipo,
      monto,
      motivo,
    });

    // Actualizar el saldo de la wallet
    const wallet = await Wallet.findByPk(walletId);
    if (wallet) {
      const montoDecimal = new Decimal(monto);

      if (tipo === "Ingreso") {
        wallet.saldo = new Decimal(wallet.saldo).plus(montoDecimal).toNumber();
      } else if (tipo === "Egreso") {
        wallet.saldo = new Decimal(wallet.saldo).minus(montoDecimal).toNumber();
      }

      await wallet.save();
    }

    res.status(201).json(newMovimiento);
  } catch (error) {
    if (error instanceof require("sequelize").ValidationError) {
      res
        .status(400)
        .json({ message: "Validation error. Please check your input." });
    } else {
      next(error);
    }
  }
};

const getMovementByWalletId = async (req, res, next) => {
  const { walletId } = req.params;

  try {
    const movements = await Movement.findAll({ where: { walletId } });

    if (movements.length > 0) {
      res.json(movements);
    } else {
      res.status(404).json({ message: "No movements found for this wallet" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createMovimiento,
  getMovementByWalletId,
};
