const express = require("express");
const { listAreas, listTopics, listUserTopics, createTopic, createStudy, listArticlesStudy, createArticle, createVideo, listVideosStudy, listCourseStudy, createCourse } = require("../controllers/infos");
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

route.get("/articlesstudy/:usertopics_id", listArticlesStudy);
route.post("/articlestudy", createArticle);
route.get("/videosstudy/:usertopics_id", listVideosStudy);
route.post("/videostudy", createVideo);
route.get("/coursesstudy/:usertopics_id", listCourseStudy);
route.post("/coursestudy", createCourse);

module.exports = route;
