import * as bcrypt from "bcrypt";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { SignIn, SignUp } from "../interface/users.interface";
import * as modelUsers from "../models/users";
import { signUpSchema, loginSchema } from "../validations/users";

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}

export const signUp = async (req: Request, res: Response) => {
  const { name, email, username, password }: SignUp = req.body;

  try {
    await signUpSchema.validate(req.body);
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
    return res.status(500).json({ message: getErrorMessage(error) });
  }
};

export const signIn = async (req: Request, res: Response) => {
  const { username, password }: SignIn = req.body;

  try {
    await loginSchema.validate(req.body);

    const user = await modelUsers.usernameExists(username);

    if (!user) {
      return res.status(404).json({ message: "Usuário ou senha incorretos" });
    }

    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
      return res.status(400).json({ message: "Usuário ou senha incorretos" });
    }

    const token = jwt.sign({ id: user.id }, "orangeNote", { expiresIn: "1h" });

    const { password: _, ...userData } = user;

    return res.status(200).json({
      userData,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: getErrorMessage(error) });
  }
};

export const userData = async (req: Request, res: Response) => {
  const userData: SignIn = req.token;
  try {
    return res.status(200).json(req);
  } catch (error) {
    return res.status(500).json({ message: getErrorMessage(error) });
  }
};
