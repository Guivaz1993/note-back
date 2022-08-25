const jwt = require("jsonwebtoken");
const { userExists } = require("../models/users");

const userTokenVerify = async (
  req,
  res,
  next
) => {
  const token = req.header("token");
  if (!token) {
    return res.status(401).json({ message: "Usuário não autenticado" });
  }

  try {
    const responseToken = jwt.verify(token, "orangeNote");

    const userData = await userExists(responseToken.id);
    if (!userData) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const { password, ...user } = userData;

    req.user = user;

    next();
  } catch (error) {
    if (error.message === "jwt expired") {
      return res.status(404).json({ message: "Por favor, reinicie sua sessão" })
    }
    return res.status(500).json({ message: error.message })
  }
};


module.exports = userTokenVerify