const knex = require("../server/connection");

const emailExists = async (email) => {
  const list = await knex("users").select("email").where({ email }).first();
  return list;
};

const usernameExists = async (username) => {
  const list = await knex("users").where({ username }).first();
  return list;
};

const insertUser = async (
  name,
  username,
  email,
  password
) => {
  name = name.trim();
  email = email.trim();
  const newUser = await knex("users")
    .insert({ name, username, email, password })
    .returning("*");
  return newUser;
};

const userExists = async (id) => {
  const list = await knex("users").where({ id }).first();
  return list;
};

module.exports = {
  emailExists,
  userExists,
  usernameExists,
  insertUser
}


