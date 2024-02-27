// db.js
require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

// Crea la instancia de sequelize
const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/billeteravirtual`,
  {
    logging: false,
    native: false,
  }
);

// Requiere y utiliza el modelo User después de crear la instancia de sequelize
const User = require("./models/User")(sequelize, Sequelize);
const Wallet = require("./models/wallet")(sequelize, Sequelize);
const Movement = require("./models/movement")(sequelize, Sequelize);

const models = { User, Wallet, Movement };

fs.readdirSync(path.join(__dirname, "/models"))
  .filter((file) => file.endsWith(".js"))
  .forEach((file) => {
    const model = require(path.join(__dirname, "/models", file));
    const modelName = model.name.charAt(0).toUpperCase() + model.name.slice(1);
    models[modelName] = model(sequelize, Sequelize.DataTypes);
  });

Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

module.exports = {
  sequelize,
  ...models,
  conn: sequelize,
  User,
  Wallet, // Añade el modelo Wallet a las exportaciones
};
