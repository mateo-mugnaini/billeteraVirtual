const { parse } = require("cookie");
const jwt = require("jsonwebtoken");

const secret = "tu_secreto_secreto"; // Reemplaza esto con tu secreto real

exports.authenticate = (req) => {
  const cookies = parse(req.headers.cookie || "");
  const token = cookies.token;

  if (!token) {
    return null; // El usuario no está autenticado
  }

  try {
    const decoded = jwt.verify(token, secret);
    return decoded; // Devuelve la información del usuario autenticado
  } catch (error) {
    return null; // Token no válido o expirado
  }
};
