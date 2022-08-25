import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { userExists } from "../models/users";
import { Token } from "../interface/users.interface";
import { string } from "yup";
import { rejects } from "assert";
import { resolve } from "path";

export interface CustomRequest extends Request {
  token: string | jwt.JwtPayload;
}

export const userTokenVerify = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("token");
  if (!token) {
    return res.status(401).json({ message: "Usuário não autenticado" });
  }

  try {
    const decode = jwt.verify(token, "orangeNote");
    console.log(decode);
    (req as CustomRequest).token = decode;

    // console.log(decode);

    // const userData = await userExists(id);
    // if (!userData) {
    //   return res.status(404).json({ message: "Usuário não encontrado" });
    // }

    // const { password, ...user } = userData;

    // req.user = user;

    next();
  } catch (error) {}
};
