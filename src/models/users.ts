import { knex } from "../server/connection";

export const emailExists = async (email: string) => {
  console.log(email);
  const list = await knex("users").select("email").where({ email }).first();
  return list;
};

export const usernameExists = async (username: string) => {
  const list = await knex("users").where({ username }).first();
  return list;
};

export const insertUser = async (
  name: string,
  username: string,
  email: string,
  password: string
) => {
  name = name.trim();
  email = email.trim();
  const newUser = await knex("users")
    .insert({ name, username, email, password })
    .returning("*");
  return newUser;
};

export const userExists = async (id: string) => {
  const list = await knex("users").where({ id }).first();
  return list;
};
