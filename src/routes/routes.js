const express = require("express");
const { listAreas, listTopics, listUserTopics, createTopic, createStudy } = require("../controllers/infos");
const { listArticlesStudy, createArticle } = require("../controllers/articles");
const { createVideo, listVideosStudy } = require("../controllers/videos");
const { createCourse, listCourseStudy } = require("../controllers/courses")
const { signIn, signUp, userData } = require("../controllers/users");
const userTokenVerify = require("../middlewares/userTokenVerfify");
const { getLesson, createLesson, updateLesson } = require("../controllers/lessons");

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

route.get("/lessons/:id", getLesson)
route.post("/lessons", createLesson)
route.patch("/lessons/:id", updateLesson)

module.exports = route;
