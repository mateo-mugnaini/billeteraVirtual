// src/models/walletModel.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Wallet = sequelize.define("wallet", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    saldo: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.0,
    },
  });

  return Wallet;
};
