import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction, response } from "express";
import { userExists } from "../models/users";
import { RequestWithUser, Token } from "../interface/users.interface";
import { string } from "yup";
import { rejects } from "assert";
import { resolve } from "path";

export const userTokenVerify = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("token");
  if (!token) {
    return res.status(401).json({ message: "Usuário não autenticado" });
  }

  try {
    const response = jwt.verify(token, "orangeNote") as Token;

    const userData = await userExists(response.id);
    if (!userData) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const { password, ...user } = userData;

    req.user = user;

    next();
  } catch (error) {}
};
