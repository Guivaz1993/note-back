import { Request } from "express";

export interface SignUp {
  name: string;
  email: string;
  username: string;
  password: string;
}

export interface SignIn {
  username: string;
  password: string;
}

export interface Token {
  id: string;
}

export interface User {
  name: string;
  email: string;
  username: string;
  password: string;
}

export interface RequestWithUser extends Request {
  user: User;
}
