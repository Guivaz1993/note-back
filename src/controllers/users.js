const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const modelUsers = require("../models/users");
const schemaUsers = require("../validations/users");

const secretToken = process.env.TOKEN_SECRET

const signUp = async (req, res) => {
  const { name, email, username, password } = req.body;

  try {
    await schemaUsers.signUpSchema.validate(req.body);
    const usernameExists = await modelUsers.usernameExists(username);
    if (usernameExists) {
      return res.status(400).json({ message: "Nome de usuário já utilizado" });
    }

    const emailExists = await modelUsers.emailExists(email);
    if (emailExists) {
      return res.status(400).json({ message: "E-mail já cadastrado" });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser = await modelUsers.insertUser(
      name,
      username,
      email,
      encryptedPassword
    );

    if (!newUser.length) {
      return res
        .status(400)
        .json({ message: "Não foi possível adicionar o usuário" });
    }

    return res.status(201).json({
      message: "Usuário criado com sucesso",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const signIn = async (req, res) => {
  const { username, password } = req.body;

  try {
    await schemaUsers.loginSchema.validate(req.body);

    const user = await modelUsers.usernameExists(username);

    if (!user) {
      return res.status(404).json({ message: "Usuário ou senha incorretos" });
    }

    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
      return res.status(400).json({ message: "Usuário ou senha incorretos" });
    }

    const token = jwt.sign({ id: user.id }, secretToken, { expiresIn: "1h" });

    const { password: _, ...userData } = user;

    return res.status(200).json({
      userData,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: getErrorMessage(error) });
  }
};

const userData = async (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  signIn,
  signUp,
  userData
}