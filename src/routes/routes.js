const express = require("express");
const { listAreas, listTopics, listUserTopics, createTopic, createStudy } = require("../controllers/infos");
const { signIn, signUp, userData } = require("../controllers/users");
const userTokenVerify = require("../middlewares/userTokenVerfify");

const route = express()

route.post("/signup", signUp);
route.post("/signin", signIn);

route.use(userTokenVerify);

route.get("/userData", userData);

route.get("/areas", listAreas);
route.get("/topics", listTopics);
route.post("/topics", createTopic)
route.get("/userTopics", listUserTopics);
route.post("/userTopics", createStudy);

module.exports = route;
