const express = require("express");
const { listAreas, listTopics, listUserTopics, createTopic, createStudy } = require("../controllers/infos");
const { listArticlesStudy, createArticle, getArticle, updateArticle } = require("../controllers/articles");
const { createVideo, listVideosStudy, getVideo, updateVideo } = require("../controllers/videos");
const { createCourse, listCourseStudy } = require("../controllers/courses")
const { signIn, signUp, userData } = require("../controllers/users");
const userTokenVerify = require("../middlewares/userTokenVerfify");
const { getLesson, createLesson, updateLesson, listLessons } = require("../controllers/lessons");

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

route.get("/articles/:usertopics_id", listArticlesStudy);
route.get("/article/detail/:id", getArticle);
route.post("/article", createArticle);
route.patch("/article/:id", updateArticle);

route.get("/videos/:usertopics_id", listVideosStudy);
route.get("/video/detail/:id", getVideo);
route.post("/videos", createVideo);
route.patch("/videos/:id", updateVideo)

route.get("/coursesstudy/:usertopics_id", listCourseStudy);
route.post("/coursestudy", createCourse);

route.get("/lessons/:course_id", listLessons)
route.get("/lesson/:id", getLesson)
route.post("/lessons", createLesson)
route.patch("/lessons/:id", updateLesson)

module.exports = route;
