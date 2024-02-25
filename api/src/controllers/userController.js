// userController.js
const { User } = require("../db");
const jwt = require("jsonwebtoken"); // Agrega esta línea
const secret = "tu_clave_secreta_aqui";

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await User.findByPk(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    // Verificar que los campos requeridos estén presentes
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Username, email, and password are required" });
    }

    const newUser = await User.create({
      username,
      email,
      password,
    });

    res.status(201).json(newUser);
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

const updateUser = async (req, res, next) => {
  const { userId } = req.params;
  const { username, email, password } = req.body;
  try {
    const user = await User.findByPk(userId);
    if (user) {
      // Update user properties
      user.username = username || user.username;
      user.email = email || user.email;
      user.password = password || user.password;
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await User.findByPk(userId);
    if (user) {
      await user.destroy();
      res.json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Buscar al usuario por su correo electrónico y contraseña
    const user = await User.findOne({ where: { email, password } });

    if (!user) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Crear un token JWT con la información del usuario
    const token = jwt.sign({ userId: user.id, email: user.email }, secret);

    // Enviar el token como cookie en la respuesta
    res.cookie("token", token, { httpOnly: true });

    // Puedes devolver información adicional del usuario si lo deseas
    res.json({
      message: "Login successful",
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
};
