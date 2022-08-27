const express = require("express");
const { listAreas, listTopics, listUserTopics } = require("../controllers/infos");
const { signIn, signUp, userData } = require("../controllers/users");
const userTokenVerify = require("../middlewares/userTokenVerfify");

const route = express()

route.post("/signup", signUp);
route.post("/signin", signIn);

route.use(userTokenVerify);

route.get("/userData", userData);

route.get("/areas", listAreas);
route.get("/topics", listTopics);
route.get("/userTopics", listUserTopics);

module.exports = route;
