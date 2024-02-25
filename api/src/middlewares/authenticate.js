const { authenticate } = require("./auth");

module.exports = function authenticateMiddleware(handler) {
  return async (req, res) => {
    const user = authenticate(req);

    if (!user) {
      return res.status(401).json({ error: "Usuario no autenticado" });
    }

    return handler(req, res);
  };
};
