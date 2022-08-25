const express = require("express");
const { signIn, signUp, userData } = require("../controllers/users");
const userTokenVerify = require("../middlewares/userTokenVerfify");

const route = express()

route.post("/signup", signUp);
route.post("/signin", signIn);

route.use(userTokenVerify);

route.get("/userData", userData);

module.exports = route;
